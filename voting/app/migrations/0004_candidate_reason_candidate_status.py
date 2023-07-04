# Generated by Django 4.2.2 on 2023-06-30 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_candidate_session_year_remove_student_branch_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='reason',
            field=models.TextField(default=None),
        ),
        migrations.AddField(
            model_name='candidate',
            name='status',
            field=models.CharField(choices=[('1', 'Selected'), ('2', 'Rejected')], default=None, max_length=60),
        ),
    ]
