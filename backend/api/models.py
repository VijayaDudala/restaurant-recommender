from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    cuisine = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="ratings"   # 🔥 FIX HERE
    )
    score = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} rated {self.restaurant.name}"