from django.db import models


class Question(models.Model):
    text = models.TextField()
    added_at = models.DateTimeField(auto_now_add=True)
    to_show_answer = models.BooleanField(default=False)
    answer = models.TextField(null=True)

    def __str__(self):
        return f"{self.text[:50]} {self.added_at}"
