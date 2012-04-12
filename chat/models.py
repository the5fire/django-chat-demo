#coding=utf-8
from django.db import models

# Create your models here.

class Chat(models.Model):
    content = models.CharField(max_length=1024)
    username = models.CharField(max_length=1024)
    date = models.DateTimeField(auto_now_add=True)