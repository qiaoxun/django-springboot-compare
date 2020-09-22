from django.urls import path
from .views import UserView

urlpatterns = [
    path(r'user/', UserView.as_view()),
]