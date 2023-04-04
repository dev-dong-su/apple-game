from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Score

admin.site.register(User)
admin.site.register(Score)