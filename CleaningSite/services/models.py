from django.db import models


class Service(models.Model):
    """Услуга компании."""

    name = models.CharField(max_length=40)
    comment = models.TextField()
    order = models.ManyToManyField(
        "orders.Order",
        related_name="services",
    )
    serv_type = models.ForeignKey(
        "service_types.ServiceType",
        on_delete=models.SET_NULL,
        related_name="services",
        null=True,
    )
    client = models.ForeignKey(
        "clients.Client",
        on_delete=models.SET_NULL,
        related_name="services",
        null=True,
    )

    def __str__(self):
        return f"{self.name} {self.serv_type}"
