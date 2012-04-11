#coding=utf-8
from django.db import models

# Create your models here.

class Chat(models.Model):
    content = models.CharField(max_length=128)