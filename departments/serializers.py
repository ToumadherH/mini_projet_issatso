from rest_framework import serializers
from .models import Department
from users.serializers import UserSerializer

class DepartmentSerializer(serializers.ModelSerializer):
    head_of_department_details = UserSerializer(source='head_of_department', read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'description', 'head_of_department', 'head_of_department_details')
