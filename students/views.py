from rest_framework import viewsets, permissions
from .models import StudentProfile, Enrollment
from .serializers import StudentProfileSerializer, EnrollmentSerializer

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['department', 'academic_year', 'level', 'student__user__id']
