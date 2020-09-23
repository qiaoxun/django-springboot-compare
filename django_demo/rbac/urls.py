from django.urls import path
from .views import UserView

urlpatterns = [
    path(r'user1/', UserView.as_view(), name='user'),
]