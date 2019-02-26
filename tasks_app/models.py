from django.db import models

class Task (models.Model):
    task = models.CharField(max_length = 60)
    isComplete = models.BooleanField(default = False)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = models.Manager()