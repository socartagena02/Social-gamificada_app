from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import Avatar

class UserSerializers(serializers.ModelSerializer):
     class Meta:
        model = User
        fields = ["id", "username", "email"]


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = [
            "avatar_id",
            "nickname",
            "rare",
            "classes",
            "kingdom",
            "skin",
            "race",
            "color1",
            "color2",
            "accesorio",
            "is_actived",
            "created_at",
        ]
        read_only_fields = ["avatar_id", "created_at"]


class RegisterSerializers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "Ya existe una cuenta con este email, intente con otro."
            )
        return value

    @transaction.atomic
    def create(self, validated_data):
        email = validated_data["email"].strip()

        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
        )

        return user