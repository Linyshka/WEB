from django.db import models


class ServiceType(models.Model):
    """Модель классификации услуг компании."""

    name = models.CharField(max_length=50, unique=True)
    cost = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.name
