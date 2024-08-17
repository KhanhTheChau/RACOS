from rest_framework import serializers
from chat.models import Query

class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'
