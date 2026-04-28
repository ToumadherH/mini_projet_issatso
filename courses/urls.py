from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, ScheduleViewSet, CourseMaterialViewSet, GradeViewSet

router = DefaultRouter()
router.register(r'list', CourseViewSet)
router.register(r'schedule', ScheduleViewSet)
router.register(r'materials', CourseMaterialViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
