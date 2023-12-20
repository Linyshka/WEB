from django.db import models
from django.db.models import CheckConstraint, Q


class Company(models.Model):
    """Информация о компании, связанная с клиентом."""

    subscription_date = models.DateField(auto_now_add=True)  # дата начала сотрудничества с компанией
    is_juridical = models.BooleanField(default=False)  # является ли компания юридическим лицом
    is_individual = models.BooleanField(default=False)  # является ли компания физическим лицом
    contact_phone = models.CharField(max_length=19)  # контактный телефон компании
    company_name = models.CharField(max_length=50, unique=True)  # имя компании

    class Meta:
        verbose_name_plural = "Companies"
        constraints = [
            CheckConstraint(
                check=Q(
                    is_individual=True,
                    is_juridical=False,
                )
                | Q(
                    is_individual=False,
                    is_juridical=True,
                ),
                name="check_juridical_status",
            ),
            CheckConstraint(
                check=Q(contact_phone__regex=r"^\+375 \((17|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$"),
                name="regex_contact_phone",
            ),
        ]

    def __str__(self):
        return f"{self.company_name} {self.contact_phone}"
