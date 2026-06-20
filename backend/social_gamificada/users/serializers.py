from rest_framework  import serializers
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = [
            "id",
            "username",
            "email"
        ]

class RegisterSerializers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Ya existe una cuenta con este email."
            )
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"]
        )