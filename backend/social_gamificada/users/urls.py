from django.urls import path
from .views import RegisterView, LoginView, AvatarView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("avatar/", AvatarView.as_view(), name="avatar"),
]
