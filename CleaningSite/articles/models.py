from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} {self.added_at}"
