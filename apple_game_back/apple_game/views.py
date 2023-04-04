import json
import os
import jwt
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer

from rest_framework import exceptions
class UserCreateAPIView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')

        existing_user = User.objects.filter(username=username).first()
        if existing_user:
            try:
                    
                access_token = jwt.encode({'username': existing_user.username, 'best_score': existing_user.best_score}, os.getenv('SECRET_KEY'), algorithm='HS256')
                return Response(access_token, status=status.HTTP_200_OK)
            except jwt.InvalidTokenError:
                raise exceptions.AuthenticationFailed('Invalid access token')

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            user = serializer.save()

            access_token = jwt.encode({ 'username': user.username }, os.getenv('SECRET_KEY'), algorithm='HS256')
            return Response(access_token, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserUpdateAPIView(APIView):
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        username = request.data.get('username')
        bestScore = request.data.get('best_score')
        user = get_object_or_404(User, username=username)

        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            access_token = jwt.encode({'username': username, 'best_score': bestScore}, os.getenv('SECRET_KEY'), algorithm='HS256')
            return Response(access_token, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)