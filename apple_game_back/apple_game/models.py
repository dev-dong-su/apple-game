from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    best_score = models.IntegerField(null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username
    
    class Meta:
        ordering = ['-best_score']