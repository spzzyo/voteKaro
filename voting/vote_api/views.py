from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from app.models import Vote
from vote_api.tasks import vote_for_candidate
from app.models import Candidate
from .serializers import VoteSerializer, CandidateVoteSerializer
from voting.utils.encryption import decrypt_data
from django.shortcuts import get_object_or_404
from api.serializer import CandidateSerializer

#celery:
class CandidateViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        try:
            candidate = Candidate.objects.get(pk=pk)
        except Candidate.DoesNotExist:
            return Response({'message': 'Invalid candidate ID.'}, status=400)
        
        vote_for_candidate.delay(candidate.student.admin.id)
        return Response({'message': 'Vote submitted.'})
    

@api_view(['POST'])
def cast_vote(request):
    serializer = VoteSerializer(data=request.data)
    if serializer.is_valid():
        user_id = serializer.validated_data['user_id']
        category_id = serializer.validated_data['category_id']
        
        # Check if the user has already voted in this category
        if Vote.objects.filter(user_id=user_id, category_id=category_id).exists():
            return Response({"error": "You have already voted in this category."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_votes_for_category(category_id):
    votes = Vote.objects.filter(category_id= category_id)
    print("hi", votes)
    return votes


def count_votes_for_category(category_id):
    votes = get_votes_for_category(category_id)
    candidate_votes = {}

    for vote in votes:
        decrypted_candidate_id = decrypt_data(vote.encrypted_candidate_id)
        candidate_id = int(decrypted_candidate_id)
        print(candidate_id)
        
        candidate_votes[candidate_id] = candidate_votes.get(candidate_id, 0) + 1

    return candidate_votes


def determine_winner_for_category(category_id):
    candidate_votes = count_votes_for_category(category_id)

    if not candidate_votes:
        return None

    # Find the candidate with the highest vote count (the winner)
    winner_candidate_id = max(candidate_votes, key=candidate_votes.get)
    winner_candidate = get_object_or_404(Candidate, pk=winner_candidate_id)
    return winner_candidate


@api_view(['GET'])
def get_category_winner(request, category_id):
    # Determine the winner for the specified category
    winner_candidate = determine_winner_for_category(category_id)
    print(winner_candidate)

    if winner_candidate:
        # If a winner is found, serialize the winner data and return the response
        serializer = CandidateSerializer(winner_candidate)
        return Response(serializer.data)
    else:
        return Response({"message": "No votes found for this category."})
    

def find_all_votes(category_id):
    candidate_votes = count_votes_for_category(category_id)
    res = {}
    for candidate_id in candidate_votes:
        res[candidate_id] = candidate_votes.get(candidate_id, 0)

    print(res)    
    return res

@api_view(['GET'])
def show_votes_for_all(request, category_id):
    candidate_votes = count_votes_for_category(category_id)

    if not candidate_votes:
        return Response(None)

    all_candidates_votes = find_all_votes(category_id)
    
    candidate_vote_data = []
    for candidate_id, vote_count in all_candidates_votes.items():
        candidate = Candidate.objects.get(pk=candidate_id)
        candidate_data = {
            'candidate_name': candidate.student.admin.first_name + ' ' + candidate.student.admin.last_name,
            'vote_count': vote_count,
        }
        candidate_vote_data.append(candidate_data)

    serializer = CandidateVoteSerializer(candidate_vote_data, many=True)
    return Response(serializer.data)



