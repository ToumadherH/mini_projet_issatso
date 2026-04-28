from django.db import models
from django.conf import settings
from students.models import StudentProfile

class Absence(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='absences')
    course_name = models.CharField(max_length=255)
    date = models.DateField()
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'ENSEIGNANT'})
    justified = models.BooleanField(default=False)
    justification_file = models.FileField(upload_to='absence_justifications/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Absence {self.student.user.get_full_name()} - {self.course_name} ({self.date})"
