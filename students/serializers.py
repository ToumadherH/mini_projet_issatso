from rest_framework import serializers
from .models import StudentProfile, Enrollment
from users.serializers import UserSerializer
from departments.serializers import DepartmentSerializer

class StudentProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = ('id', 'user', 'user_details', 'matricule', 'date_of_birth')

class EnrollmentSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    department_details = DepartmentSerializer(source='department', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ('id', 'student', 'student_details', 'department', 'department_details', 'academic_year', 'level')
