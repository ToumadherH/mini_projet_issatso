from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentProfileViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register(r'profiles', StudentProfileViewSet)
router.register(r'enrollments', EnrollmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
