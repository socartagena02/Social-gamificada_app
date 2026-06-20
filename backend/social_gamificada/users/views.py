from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import RegisterSerializers, UserSerializers

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializers(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializers(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            user = authenticate(username= user.username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializers(user).data,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                })
        except User.DoesNotExist:
            pass
        
        return Response({'error': 'Las credenciales no existen'}, status=status.HTTP_401_UNAUTHORIZED)