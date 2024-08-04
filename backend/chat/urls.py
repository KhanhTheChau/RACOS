from django.urls import path
from .views import get_query

urlpatterns = [
    path('prompt', get_query, name='get_query'),
    # path('prompt_simple', get_query_simple, name='get_query_simple'),

]
