from django.db import models
from django.utils.translation import gettext_lazy as _


class PlacementChoices(models.TextChoices):
    OFFICE = "Office", _("OF")
    REMOTELY = "Remotely", _("RM")
    FLEXIBLE = "Flexible", _("FL")


class BusynessChoices(models.TextChoices):
    PART_TIME = "Part time", _("PT")
    FULL_TIME = "Full time", _("FT")


class Vacancies(models.Model):
    name = models.CharField(max_length=50)
    specialization = models.ForeignKey("employee_specializations.EmployeeSpecialization", on_delete=models.CASCADE)
    placement = models.CharField(max_length=20, choices=PlacementChoices.choices)
    busyness = models.CharField(max_length=20, choices=BusynessChoices.choices)
    comment = models.TextField()

    class Meta:
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return self.name

