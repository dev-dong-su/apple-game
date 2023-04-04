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

class Score(models.Model):
    score = models.IntegerField()
    user = models.ForeignKey(User, related_name='scores', on_delete=models.CASCADE)
    user_best_score = models.ForeignKey(User, related_name='best_scores', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}: {self.score}"