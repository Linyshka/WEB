from django.db import models
from django.db.models import CheckConstraint, Q


class Client(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    age = models.IntegerField()

    company = models.OneToOneField("companies.Company", on_delete=models.CASCADE)

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(age__gte=18),
                name="check_client_age",
            ),
        ]

    def full_name(self):
        return f"{self.first_name} {self.last_name} {self.surname}"

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.company.company_name}"
