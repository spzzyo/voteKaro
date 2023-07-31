from django.urls import path
from .views import CandidateViewSet,cast_vote, get_category_winner,show_votes_for_all

candidate_vote = CandidateViewSet.as_view({
    'post': 'vote',
})

urlpatterns = [
    path('vote_api/<int:pk>/', candidate_vote, name='vote'),
    path('vote_api/cast_vote', cast_vote, name = 'cast_vote'),
    path('category/<int:category_id>/winner/', get_category_winner, name='category_winner'),
    path('category/<int:category_id>/all/', show_votes_for_all, name='votes_for_all'),
    
]