from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    name = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()
    # organization = serializers.ForeignKey()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = verbose_name
        db_table = 'django_user'
