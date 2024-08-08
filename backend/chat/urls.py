from django.urls import path
from .views import get_query

urlpatterns = [
    path('prompt', get_query, name='get_query'),
]
