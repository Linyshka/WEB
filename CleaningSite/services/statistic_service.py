from django.db.models import Avg, Sum

from clients.models import Client
from orders.models import Order


class StatService:
    @staticmethod
    def list_clients_and_sum_sale_incomes():
        clients = Client.objects.order_by("last_name")
        total_sum = Order.objects.aggregate(Sum("cost"))
        return clients, total_sum

    @staticmethod
    def average_mode_median_sale_incomes():
        request = """
        SELECT id, cost
        FROM orders_order
        GROUP BY cost
        ORDER BY COUNT(*) DESC
        LIMIT 1;
        """
        mode = Order.objects.raw(request)
        if len(mode) > 0:
            mode = mode[0].cost
        average = Order.objects.aggregate(Avg("cost"))["cost__avg"]
        queryset = Order.objects.all()
        count = queryset.count()
        if count:
            median = queryset.values_list("cost", flat=True).order_by("cost")[int(round(count / 2))]
        else:
            median = None
        return mode, median, average

    @staticmethod
    def average_and_median_client_age():
        queryset = Client.objects.all()
        average_age = queryset.aggregate(Avg("age"))["age__avg"]
        count = queryset.count()
        median = None
        if count:
            median = queryset.values_list("age", flat=True).order_by("age")[int(round(count / 2))]
        return average_age, median

    # @staticmethod
    # def most_valuable_service_type():
