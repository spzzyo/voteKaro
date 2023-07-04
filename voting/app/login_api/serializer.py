from rest_framework.serializers import ModelSerializer
from app.models import CustomUser

# class NoteSerializer(ModelSerializer):
#     class Meta:
#         model = Note
#         fields = '__all__'

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'user_type', 'phone_number')

# Register Serializer
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'user_type', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data['phone_number'],
        )
        return user
    
# class VerifyUserSerializer(ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fie