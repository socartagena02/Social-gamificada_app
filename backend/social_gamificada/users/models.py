from django.db import models
from django.contrib.auth.models import User

class ActivityType(models.Model):
    activity_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description =  models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
       return self.name

class Avatar(models.Model):
    avatar_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='avatar')
    skin = models.CharField(max_length=8, default='default')
    color1 = models.CharField(max_length=7, default='#FFFFFF')
    color2 = models.CharField(max_length=7, default='#000000')
    accesorio = models.JSONField(default=list, blank=True)
    is_actived = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"avatar de {self.user.username}"
    
class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    creator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_activities')
    activity_type = models.ForeignKey(ActivityType, on_delete=models.SET_NULL, null=True)
    titulo = models.CharField(max_length=200)
    description = models.TextField()
    exp = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.titulo

class Like(models.Model):
    like_id =  models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='likes')
    class Meta:
        unique_together = ('user', 'activity')
    
    def __str__(self):
        return f"{self.user.username} le dio me gusta {self.activity.titulo}"

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='participants')
    joined_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    class Meta:
        unique_together = ('user', 'activity')
    
    def __str__(self):
        return f"{self.user.username} se unio {self.activity.titulo}"

class Exp(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='user_exp')
    points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    def __str__(self):
        return f"{self.user.username} subio de nivel {self.level}"