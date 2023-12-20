from django.core.validators import MaxValueValidator, MinValueValidator

from django.db import models
from django.db.models import CheckConstraint, F, Q


class Promocodes(models.Model):
    name = models.CharField(max_length=50)
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    conditions = models.TextField()
    start_date = models.DateTimeField()
    finish_date = models.DateTimeField()
    percent = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])

    class Meta:
        constraints = [CheckConstraint(name="promocode_check_dates", check=Q(start_date__lt=F("finish_date")))]
        verbose_name_plural = "Promocodes"

    def __str__(self):
        return self.name
