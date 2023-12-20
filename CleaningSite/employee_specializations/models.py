from django.db import models


class EmployeeSpecialization(models.Model):
    """Специализация сотрудника компании. Она говорит о том, какие услуги может оказывать конкретный сотрудник."""

    name = models.CharField(max_length=100)
    service_types = models.ManyToManyField("service_types.ServiceType", related_name="specializations")

    def __str__(self):
        return self.name
