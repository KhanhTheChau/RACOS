from django.urls import path
from . import views

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('upload', views.FileUploadView.as_view(), name='file-upload'),
]
