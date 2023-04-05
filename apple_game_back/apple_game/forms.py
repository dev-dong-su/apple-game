from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User
from django import forms

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username', 'best_score')
