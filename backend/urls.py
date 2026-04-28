from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', include('users.urls')),
    path('api/departments/', include('departments.urls')),
    path('api/students/', include('students.urls')),
    path('api/internships/', include('internships.urls')),
    path('api/attendance/', include('attendance.urls')),
    path('api/courses/', include('courses.urls')),
]
