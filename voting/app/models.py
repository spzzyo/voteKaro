from django.db import models
from django.contrib.auth.models import AbstractUser
# from cryptod import EncryptedCharField
import uuid
import hashlib
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class CustomUser(AbstractUser):
    USER = (
        ('1', 'HOD'),
        ('2', 'Student'),
    )
    phone_number = models.CharField(max_length=12)
    is_phone_verified = models.BooleanField(default=False)
    user_type = models.CharField(choices=USER, max_length=50, default=2)

    

class Session_Year(models.Model):
    session_start = models.CharField(max_length=100)
    session_end = models.CharField(max_length=100)

    def __str__(self):
                return self.session_start + " to "+ self.session_end
    

class Student(models.Model):
    GENDER = (
        ('1', 'Male'),
        ('2', 'Female'),
    )

    dept = (
        ('1', 'Comps'),
        ('2', 'AIML'),
        ('3', 'DS'),
        ('4', 'EXTC'),
        ('5', 'IT'),
        ('6', 'ETRX'),
        ('7', 'MCA'),
    )

    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key= True)
    uid = models.IntegerField()
    gender = models.CharField(choices=GENDER, max_length=50, default= None)
    department = models.CharField(choices=dept, max_length=50, default= None)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.username
    
class Vote(models.Model):
      
    user_id = models.CharField(max_length=100)
    encrypted_candidate_id = models.CharField(max_length=200)
    category_id = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_id', 'category_id')
    
    def __str__(self):
        return self.category_id
    
class StudentVotes(models.Model):
    student_id = models.IntegerField(unique=True,primary_key=True) 

    category1 = models.BooleanField(default=False) 
    category2 = models.BooleanField(default=False)
    category3 = models.BooleanField(default=False)

    def __str__(self):
        return f"Votes for Student ID: {self.student_id}"
    

@receiver(post_save, sender=Student)
def create_student_votes(sender, instance, created, **kwargs):
    if created:
        # If a new Student object is created, create a corresponding StudentVotes object
        StudentVotes.objects.create(student_id=instance.admin.id)

@receiver(post_save, sender=Vote)
def update_student_votes(sender, instance, created, **kwargs):
    if created:
        # If a new vote is created, update the corresponding category field in StudentVotes
        student_id = instance.user_id
        category_id = instance.category_id

        student_votes, created = StudentVotes.objects.get_or_create(student_id=student_id)
        if category_id == '1':
            student_votes.category1 = True
        elif category_id == '2':
            student_votes.category2 = True
        elif category_id == '3':
            student_votes.category3 = True

        student_votes.save()



class Staff(models.Model):
    GENDER = (
        ('1', 'Male'),
        ('2', 'Female'),
    )

    dept = (
        ('1', 'Comps'),
        ('2', 'AIML'),
        ('3', 'DS'),
        ('4', 'EXTC'),
        ('5', 'IT'),
        ('6', 'ETRX'),
        ('7', 'MCA'),
    )

    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE,primary_key= True)
    uid = models.IntegerField()
    gender = models.CharField(choices=GENDER, max_length=50, default= None)
    department = models.CharField(choices=dept, max_length=50, default= None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.first_name
    

class SelectedCandidateManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status='1')  # Filter candidates with status 'Selected'


class Candidate(models.Model):

    categories =(
        ('1', 'GENSEC'),
        ('2', 'FINANCESEC'),
        ('3', 'SPORTSSEC'),
    )
    status =(
         ('1','Selected'),
         ('2', 'Rejected'),
    )

    student = models.OneToOneField(Student, on_delete=models.CASCADE,primary_key=True)
    category = models.CharField(choices=categories,max_length=60, default=None)
    votes = models.IntegerField(default=0, )
    reason = models.TextField(default=None)
    status = models.CharField(choices=status,max_length=60, default=None)
    objects = models.Manager()  # The default manager
    selected_candidates = SelectedCandidateManager()  # Custom manager for selected candidates

    def __str__(self):
        return self.student.admin.username




    # voter_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    # category_id =  models.PositiveIntegerField() 
    # hashed_vote_token = models.CharField(max_length=64)
    # candidate_id = models.PositiveIntegerField()


    # def generate_vote_token(cls, category_id, candidate_id):
    #     # Step 1: Generate a random vote ID
    #     vote_id = str(uuid.uuid4())
    #     vote_token = f"{vote_id}_{category_id}_{candidate_id}"
    #     hashed_vote_token = hashlib.sha256(vote_token.encode()).hexdigest()

    #     return hashed_vote_token

    # def __str__(self):
    #     return f"Vote by {self.voter_id} for {self.candidate_id} in category {self.category_id}"




     





    


