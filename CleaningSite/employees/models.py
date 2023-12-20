from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CheckConstraint, F, Q


class Roles(models.TextChoices):
    manager = "MANAGER"
    cleaner = "CLEANER"


class Employee(AbstractUser):
    """Сотрудник компании."""

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField()
    experience = models.DecimalField(decimal_places=1, max_digits=4, null=True)
    date_of_birth = models.DateField()
    applied_at = models.DateField(auto_now_add=True)
    specializations = models.ManyToManyField(
        "employee_specializations.EmployeeSpecialization",
        related_name="employees",
    )
    image = models.ImageField(upload_to="employees/", null=True)
    role = models.CharField(max_length=50, choices=Roles.choices, null=True)

    REQUIRED_FIELDS = ["first_name", "last_name", "surname", "experience", "date_of_birth", "email"]

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(applied_at__gt=F("date_of_birth") + timedelta(weeks=864)),
                name="check_employee_age",
            )
        ]

    def __str__(self):
        return f"{self.email} {self.role}"

    def is_cleaner(self):
        return self.role == Roles.cleaner

    def is_manager(self):
        return self.role == Roles.manager

    def full_name(self):
        return f"{self.first_name} {self.last_name} {self.surname}"
