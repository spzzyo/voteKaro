from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.db.models import F
from app.models import Student, Staff, Candidate, CustomUser
from api.serializer import StudentSerializer, StaffSerializer, CandidateSerializer, AdminSerializer


class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        admins = CustomUser.objects.all()
        serializer = AdminSerializer(admins, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        admin = CustomUser.objects.get(pk=pk)
        serializer = AdminSerializer(admin)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        admin = CustomUser.objects.get(pk=pk)
        serializer = AdminSerializer(admin, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class StudentViewSet(viewsets.ViewSet):
    def list(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        student = Student.objects.get(pk=pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        student = Student.objects.get(pk=pk)
        student.delete()
        return Response(status=204)
    
    def create(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save(admin_id=request.data.get('admin_id'))  # Pass the admin_id as an argument to save method
            return Response(serializer.data)
        return Response(serializer.errors, status=400)  

    def update(self, request, pk=None):
        student = Student.objects.get(pk=pk)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

class CandidateViewSet(viewsets.ViewSet):
    def list(self, request):
        candidates = Candidate.objects.all()
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        candidate = Candidate.objects.get(pk=pk)
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        candidate = Candidate.objects.get(pk=pk)
        candidate.delete()
        return Response(status=204)
    
    def create(self, request):
        serializer = CandidateSerializer(data=request.data)
        if serializer.is_valid():
            candidate = serializer.save(admin_id=request.data.get('admin_id'))  # Pass the admin_id as an argument to save method
            return Response(serializer.data)
        return Response(serializer.errors, status=400)  


    def update(self, request, pk=None):
        candidate = Candidate.objects.get(pk=pk)
        serializer = CandidateSerializer(candidate, data=request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def filter_by_category(self, request, category=None):
        candidates = Candidate.objects.filter(category=category)
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)
    
   
class StaffViewSet(viewsets.ViewSet):
    def list(self, request):
        staffs = Staff.objects.all()
        serializer = StaffSerializer(staffs, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        staff = Staff.objects.get(pk=pk)
        serializer = StaffSerializer(staff)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        staff = Staff.objects.get(pk=pk)
        staff.delete()
        return Response(status=204)
    
    
  
