from rest_framework import serializers
from .models import Absence
from students.serializers import StudentProfileSerializer

class AbsenceSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    
    class Meta:
        model = Absence
        fields = '__all__'

class JustifyAbsenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absence
        fields = ('justified', 'justification_file')
