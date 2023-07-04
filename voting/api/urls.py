from django.urls import path
from .views import StudentViewSet

student_list = StudentViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
student_detail = StudentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('view_api/students/', student_list, name='student-list'),
    path('view_api/students/<int:pk>/', student_detail, name='student-detail'),

    
]
