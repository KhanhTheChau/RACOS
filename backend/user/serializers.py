from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, File

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'created_at', 'department']
        extra_kwargs = {
            'password': {'write_only': True},  # Không trả về mật khẩu trong response
        }
    




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        return {'user': user}

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['user', 'file']
