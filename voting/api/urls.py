from django.urls import path
from .views import StudentViewSet, StaffViewSet, CandidateViewSet, UserViewSet

user_list = UserViewSet.as_view({
    'get': 'list',
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
})
user_update = UserViewSet.as_view({
    'put': 'update'
})



student_list = StudentViewSet.as_view({
    'get': 'list',
})
student_detail = StudentViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy'
})
student_update = StudentViewSet.as_view({
    'put': 'update'
})
student_create = StudentViewSet.as_view({
    'post': 'create'
})





staff_list = StaffViewSet.as_view({
    'get': 'list',
})
staff_detail = StaffViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy'
})



candidate_list = CandidateViewSet.as_view({
    'get': 'list',
})
candidate_detail = CandidateViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy',
})
candidate_update = CandidateViewSet.as_view({
    'put': 'update'
})
candidate_create = CandidateViewSet.as_view({
    'post': 'create'
})
candidate_category = CandidateViewSet.as_view({
    'get': 'filter_by_category',
})





urlpatterns = [
    path('view_api/user/', user_list, name='user-list'),
    path('view_api/user/<int:pk>/', user_detail, name='user-detail'),
    path('view_api/user/update/<int:pk>/', user_update, name='user-update'),
    path('view_api/staff/', staff_list, name='staff-list'),
    path('view_api/staff/<int:pk>/', staff_detail, name='staff-detail'),
    path('view_api/students/', student_list, name='student-list'),
    path('view_api/students/<int:pk>/', student_detail, name='student-detail'),
    path('view_api/student/create/', student_create, name='student-create'),  
    path('view_api/students/<int:pk>/update/', student_update, name='student-update'),


    path('view_api/candidates/', candidate_list, name='candidate-list'),
    path('view_api/candidates/<int:pk>/', candidate_detail, name='candidate-detail'),
    path('view_api/candidates/create/', candidate_create, name='candidate-post'),
    path('view_api/candidates/category/<str:category>/', candidate_category, name = 'candidate-category'),
    path('view_api/candidates/status_update/<int:pk>/', candidate_update ,name='candidate-update'),
   

    
]
