from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User


class UserView(APIView):

    def get(self, request, *args, **kwargs):
        print('UserView')
        user_list = User.objects.all()
        print(user_list)
        response = Response(user_list, status=status.HTTP_200_OK)
        return response

