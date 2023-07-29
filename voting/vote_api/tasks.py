from celery import shared_task
from app.models import Candidate

@shared_task
def vote_for_candidate(candidate_id):
    candidate = Candidate.objects.get(pk=candidate_id)
    candidate.votes += 1
    candidate.save()

