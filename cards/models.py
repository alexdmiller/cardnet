from django.db import models

# Create your models here.
class Card(models.Model):
  name = models.CharField(max_length=200)
  graphics = models.CharField(max_length=10000)