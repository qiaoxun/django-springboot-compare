from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, OrganizationViewSet

router = routers.SimpleRouter()
router.register(r'user', UserViewSet, base_name="user")
router.register(r'org', OrganizationViewSet, base_name="org")

urlpatterns = [
    path(r'', include(router.urls)),
]