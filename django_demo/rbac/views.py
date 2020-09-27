from rest_framework.viewsets import ModelViewSet

from .models import User, Organization
from .serializers.serializers import UserSerializer, OrganizationSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

