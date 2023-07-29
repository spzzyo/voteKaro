from rest_framework import serializers
from app.models import Vote
from voting.utils.encryption import encrypt_data,decrypt_data

# class VoteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Vote
#         fields = ['user_id',"category_id","candidate_id",]

class VoteSerializer(serializers.ModelSerializer):
    candidate_id = serializers.CharField(max_length=100)

    class Meta:
        model = Vote
        fields = ('user_id', 'category_id', 'candidate_id')

    def create(self, validated_data):
        # Encrypt the candidate_id before saving to the database
        candidate_id = validated_data['candidate_id']
        encrypted_candidate_id = encrypt_data(candidate_id)
        vote = Vote.objects.create(
            user_id=validated_data['user_id'],
            category_id=validated_data['category_id'],
            encrypted_candidate_id=encrypted_candidate_id
        )
        return vote
    

    