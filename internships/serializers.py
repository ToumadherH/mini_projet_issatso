from rest_framework import serializers
from .models import Internship, Evaluation
from students.serializers import StudentProfileSerializer
from users.serializers import UserSerializer

class InternshipSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    
    class Meta:
        model = Internship
        fields = '__all__'
        read_only_fields = ('status', 'created_at', 'updated_at')

class InternshipValidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ('status',)

class EvaluationSerializer(serializers.ModelSerializer):
    evaluator_details = UserSerializer(source='evaluator', read_only=True)
    
    class Meta:
        model = Evaluation
        fields = '__all__'
