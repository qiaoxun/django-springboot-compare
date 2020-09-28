from rest_framework import serializers

from rbac.models import Organization, User


class OrganizationSerializer(serializers.ModelSerializer):
    type_meaning = serializers.CharField(source='get_type_display', read_only=True)
    parent = serializers.CharField(source='pid.name', read_only=True)

    class Meta:
        model = Organization
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = User
        fields = '__all__'
