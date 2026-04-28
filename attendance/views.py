from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Absence
from .serializers import AbsenceSerializer, JustifyAbsenceSerializer

class AbsenceViewSet(viewsets.ModelViewSet):
    queryset = Absence.objects.all()
    serializer_class = AbsenceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student__user__id', 'course_name', 'justified', 'date']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'ETUDIANT':
            return Absence.objects.filter(student__user=user)
        elif user.role == 'ENSEIGNANT':
            return Absence.objects.filter(teacher=user)
        return Absence.objects.all()
        
    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'ENSEIGNANT':
            serializer.save(teacher=user)
        else:
            serializer.save()

    @action(detail=True, methods=['put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def justify(self, request, pk=None):
        absence = self.get_object()
        if request.user.role != 'ETUDIANT' or absence.student.user != request.user:
            return Response({'detail': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = JustifyAbsenceSerializer(absence, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
