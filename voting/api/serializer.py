
from app.models import CustomUser, Staff, Student, Candidate
from rest_framework import serializers


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["first_name",'last_name', 'email', 'id',"phone_number", "user_type"]  

class StaffSerializer(serializers.ModelSerializer):
    admin = AdminSerializer()
    class Meta:
        model = Staff
        fields = '__all__'
        extra_kwargs = {
            'gender': {'choices': Staff.GENDER}
            
        }

class StudentSerializer(serializers.ModelSerializer):
    admin = AdminSerializer(read_only=True)
    admin_id = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), source='admin', write_only=True)

    class Meta:
        model = Student
        fields = ['admin_id','admin', 'uid', 'gender', 'department', 'created_at', 'updated_at']
        extra_kwargs = {
            'gender': {'choices': Student.GENDER}
        }

    def create(self, validated_data):
        admin_id = validated_data.pop('admin_id')  # Remove admin_id from validated_data
        admin = CustomUser.objects.get(pk=admin_id)
        validated_data['admin'] = admin  # Set the 'admin' field in validated_data
        student = Student.objects.create(**validated_data)
        return student


class CandidateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only = True)
    admin_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student.admin', write_only=True)
    
    class Meta:
        model = Candidate
        fields = ['admin_id','student','category','status','reason','votes']
        # extra_kwargs = {
        #     'gender': {'choices': Student.GENDER}
            
        # }

    # def create(self, validated_data):
    #     admin_id = validated_data.pop('admin_id')  # Remove admin_id from validated_data
    #     student = Student.objects.get(pk=admin_id)
    #     validated_data['student'] = student  # Set the 'admin' field in validated_data
    #     candidate = Student.objects.create(**validated_data)
    #     return candidate

    def create(self, validated_data):
        admin_id = validated_data.pop('admin_id')
        student = Student.objects.get(pk=admin_id)
        validated_data['student'] = student
        candidate = Candidate.objects.create(**validated_data)
        return candidate



