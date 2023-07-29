from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import CustomUserSerializer, RegisterSerializer
from app.models import CustomUser

from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['user_id'] = user.id
        # ...

        

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# End points

@api_view(['GET', 'POST'])
def getRoutes(request):
    
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes, safe=False)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user # for that particular user only 
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    cust = CustomUser.objects.all()
    serializer = CustomUserSerializer(cust, many=True)
    return Response(serializer.data)

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": CustomUserSerializer(user, context=self.get_serializer_context()).data,
        
        })