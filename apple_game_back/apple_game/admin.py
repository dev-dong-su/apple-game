from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.forms import UserChangeForm

from .forms import CustomUserCreationForm
from .models import User

class CustomUserChangeForm(UserChangeForm):
    password = None

    class Meta:
        model = User
        fields = '__all__'

class CustomUserAdmin(DefaultUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    add_fieldsets = (
        (None, {
            'fields': ('username', 'best_score'),
        }),
    )
    fieldsets = (
        (None, {'fields': ('username', 'best_score', 'created_at')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    ordering = ('-best_score',)

admin.site.register(User, CustomUserAdmin)