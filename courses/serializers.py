from rest_framework import serializers
from .models import Course, Schedule, CourseMaterial, Grade
from users.serializers import UserSerializer
from departments.serializers import DepartmentSerializer
from students.serializers import StudentProfileSerializer

class CourseSerializer(serializers.ModelSerializer):
    teacher_details = UserSerializer(source='teacher', read_only=True)
    department_details = DepartmentSerializer(source='department', read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    
    class Meta:
        model = Schedule
        fields = '__all__'

class CourseMaterialSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    
    class Meta:
        model = CourseMaterial
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    student_details = StudentProfileSerializer(source='student', read_only=True)
    
    class Meta:
        model = Grade
        fields = '__all__'
