from django.db import models
from django.conf import settings
from departments.models import Department

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    matricule = models.CharField(max_length=20, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.matricule}"

class Enrollment(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='enrollments')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='enrollments')
    academic_year = models.CharField(max_length=9)  # e.g., 2023-2024
    level = models.CharField(max_length=50)  # e.g., '1ere annee', '2eme annee'
    
    class Meta:
        unique_together = ('student', 'academic_year')
        
    def __str__(self):
        return f"{self.student.matricule} - {self.department.name} ({self.academic_year})"
