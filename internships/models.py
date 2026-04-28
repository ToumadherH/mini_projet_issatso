from django.db import models
from django.conf import settings
from students.models import StudentProfile

class Internship(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'En attente'),
        ('VALIDATED', 'Validé'),
        ('REJECTED', 'Rejeté'),
    )
    
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='internships')
    subject = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    duration_months = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    report_file = models.FileField(upload_to='internship_reports/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.subject} - {self.student.user.get_full_name()}"

class Evaluation(models.Model):
    internship = models.OneToOneField(Internship, on_delete=models.CASCADE, related_name='evaluation')
    evaluator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'ENSEIGNANT'})
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Evaluation: {self.internship.subject}"
