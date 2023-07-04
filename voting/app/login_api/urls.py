from django.urls import path
from . import views_api
from .views_api import MyTokenObtainPairSerializer, MyTokenObtainPairView, RegisterAPI

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views_api.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views_api.createUser),
    path('users/show', views_api.getUsers),
    path('register/', RegisterAPI.as_view(), name='register'),
]