from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AbsenceViewSet

router = DefaultRouter()
router.register(r'records', AbsenceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
