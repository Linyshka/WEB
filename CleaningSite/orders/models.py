from django.db import models


class Order(models.Model):
    """Заказ у компании."""

    order_code = models.UUIDField(unique=True)
    client_address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    client_data = models.ForeignKey("clients.Client", on_delete=models.CASCADE, related_name="order")
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    cleaners = models.ManyToManyField("employees.Employee", related_name="orders")

    def __str__(self):
        return f"{self.order_code} {self.client_data.full_name()} {self.cost}"
