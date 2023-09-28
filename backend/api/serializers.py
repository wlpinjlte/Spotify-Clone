from rest_framework import serializers
from .models import Song, Users
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff']=user.is_staff
        return token


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, attrs):
        if (User.objects.filter(username=attrs['username']).exists()):
            raise ValidationError(
                {"email": "User with this email already exists."}
            )
        return attrs

    def create(self, validated_data):
        newUser = User.objects.create_user(username=validated_data["username"], password=validated_data['password'])
        fieldInUsers = Users.objects.create(
            user=newUser
        )
        fieldInUsers.save()
        return newUser