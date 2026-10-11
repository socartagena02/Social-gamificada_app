from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import RegisterSerializers, UserSerializers, AvatarSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError, transaction
from .models import Avatar

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
    
class AvatarView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        avatar = Avatar.objects.filter(user=request.user).first()

        if avatar is None:
            return Response(
                {"error": "El usuario no tiene un avatar."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(AvatarSerializer(avatar).data)

    def post(self, request):
        if Avatar.objects.filter(user=request.user).exists():
            return Response(
                {"error": "Ya tienes un personaje creado."},
                status=status.HTTP_409_CONFLICT,
            )

        serializer = AvatarSerializer(data=request.data)

        if serializer.is_valid():
            avatar = serializer.save(user=request.user)
            return Response(
                AvatarSerializer(avatar).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request):
        avatar = Avatar.objects.filter(user=request.user).first()

        if avatar is None:
            return Response(
                {"error": "Primero debes crear tu personaje."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = AvatarSerializer(
            avatar,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
