from django.urls import path
from .views import CandidateViewSet,cast_vote

candidate_vote = CandidateViewSet.as_view({
    'post': 'vote',
})

urlpatterns = [
    path('vote_api/<int:pk>/', candidate_vote, name='vote'),
    path('vote_api/cast_vote', cast_vote, name = 'cast_vote'),

]