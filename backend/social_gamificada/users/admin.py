from django.contrib import admin
from .models import( ActivityType, Avatar, Activity, Like, UserActivity, Exp)

admin.site.register(ActivityType)
admin.site.register(Avatar)
admin.site.register(Activity)
admin.site.register(Like)
admin.site.register(UserActivity)
admin.site.register(Exp)