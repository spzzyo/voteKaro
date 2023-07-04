from django.db import models
from django.contrib.auth.models import AbstractUser
# from cryptod import EncryptedCharField

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

    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    uid = models.IntegerField()
    # branch = models.CharField(max_length=50)
    # session_year_id = models.ForeignKey(Session_Year, on_delete=models.DO_NOTHING)
    gender = models.CharField(choices=GENDER, max_length=50, default= None)
    department = models.CharField(choices=dept, max_length=50, default= None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.first_name


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

    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
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


class Candidate(Student):

    categories =(
        ('1', 'GENSEC'),
        ('2', 'FINANCESEC'),
        ('3', 'SPORTSSEC'),
    )
    status =(
         ('1','Selected'),
         ('2', 'Rejected'),
    )
    category = models.CharField(choices=categories,max_length=60, default=None)
    reason = models.TextField(default=None)
    status = models.CharField(choices=status,max_length=60, default=None)
    objects = models.Manager()  # The default manager
    selected_candidates = SelectedCandidateManager()  # Custom manager for selected candidates






    


