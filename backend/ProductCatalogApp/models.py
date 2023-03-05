from django.db import models

# Create your models here.

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    description = models.TextField()
    price = models.FloatField()
    active = models.BooleanField()
    tags = models.TextField(blank=True)
    picture = models.TextField(blank=True)