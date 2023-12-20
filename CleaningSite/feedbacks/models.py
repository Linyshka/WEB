from django.db import models
from django.db.models import CheckConstraint, Q

class Feedback(models.Model):
    client_name = models.CharField(max_length=70)
    content = models.TextField()
    mark = models.IntegerField()
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            CheckConstraint(
                name="feedback_mark_range",
                check=Q(mark__gt=0) & Q(mark__lte=5),
            )
        ]

    def __str__(self):
        return f"{self.client_name} {self.added_at}"
