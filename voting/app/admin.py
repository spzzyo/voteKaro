from django.contrib import admin

# Register your models here.
from .models import *
from django.contrib.auth.admin import UserAdmin






admin.site.register(CustomUser)
admin.site.register(Student)
admin.site.register(Staff)
admin.site.register(Candidate)

