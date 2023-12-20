from django.db import models

class New(models.Model):
    title = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="news/")

    def __str__(self):
        return f"{self.title}"
