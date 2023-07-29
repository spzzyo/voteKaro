from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from app.models import Vote
from vote_api.tasks import vote_for_candidate
from app.models import Candidate
from .serializers import VoteSerializer
from voting.utils.encryption import decrypt_data
from django.shortcuts import get_object_or_404

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

    return votes


def count_votes_for_category(category_id):
    votes = get_votes_for_category(category_id)
    candidate_votes = {}

    for vote in votes:
        decrypted_candidate_id = decrypt_data(vote.encrypted_candidate_id)
        candidate_id = int(decrypted_candidate_id)
        
        candidate_votes[candidate_id] = candidate_votes.get(candidate_id, 0) + 1

    return candidate_votes


def determine_winner_for_category(category_id):
    candidate_votes = count_votes_for_category(category_id)

    if not candidate_votes:
        return None

    # Find the candidate with the highest vote count (the winner)
    winner_candidate_id = max(candidate_votes, key=candidate_votes.get)
    winner_candidate = get_object_or_404(Candidate, id=winner_candidate_id)
    return winner_candidate


