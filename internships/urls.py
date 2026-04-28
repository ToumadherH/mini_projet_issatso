from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InternshipViewSet, EvaluationViewSet

router = DefaultRouter()
router.register(r'applications', InternshipViewSet)
router.register(r'evaluations', EvaluationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
