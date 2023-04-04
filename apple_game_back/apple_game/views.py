import os
import jwt

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
            payload = {'username': existing_user.username}
            try:
                payload = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')
                return Response(payload, status=status.HTTP_200_OK)
            except jwt.InvalidTokenError:
                raise exceptions.AuthenticationFailed('Invalid access token')

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            user = serializer.save()

            payload = { 'username': user.username }
            access_token = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')
            return Response(access_token, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserAPIView(APIView):
    
    def get(self, request, *args, **kwargs):
        user_id = request.GET.get('id', None)

        if user_id is not None:
            try:
                user = User.objects.get(id=user_id)
                return Response({'username': user.username}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
