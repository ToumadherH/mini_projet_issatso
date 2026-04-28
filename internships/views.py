from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Internship, Evaluation
from .serializers import InternshipSerializer, InternshipValidateSerializer, EvaluationSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'student__user__id']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'ETUDIANT':
            return Internship.objects.filter(student__user=user)
        return Internship.objects.all()
        
    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'ETUDIANT' and hasattr(user, 'student_profile'):
            serializer.save(student=user.student_profile)
        else:
            serializer.save()

    @action(detail=True, methods=['put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def validate(self, request, pk=None):
        internship = self.get_object()
        if request.user.role not in ['CHEF', 'ADMIN']:
            return Response({'detail': 'Not authorized to validate internships'}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = InternshipValidateSerializer(internship, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'ENSEIGNANT':
            serializer.save(evaluator=user)
        else:
            serializer.save()
