from typing import Dict, List, Union
from uuid import uuid4

from django.db import transaction
from django.db.models import Sum
from django.forms.utils import ErrorDict
from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from common.metaclasses import SingletonMeta
from employees.models import Employee
from services.models import Service

from .forms import OrderCreationForm, OrderModelForm
from .models import Order


class OrderService(metaclass=SingletonMeta):
    @staticmethod
    def validate_and_create_order(request: HttpRequest, client_pk: int) -> ErrorDict:
        """Contains the logic of validation"""
        form = OrderCreationForm(request.POST)
        if form.is_valid():
            data = form.data.dict()
            data.pop("services")

            total_cost = OrderService.calculate_order_cost(request.POST.getlist("services"))
            Employee.objects.filter(id__in=request.POST.getlist("cleaners"))
            model_form = OrderModelForm(
                data=data
                | {
                    "order_code": uuid4(),
                    "client_data": client_pk,
                    "cost": total_cost,
                    "cleaners": request.POST.getlist("cleaners"),
                }
            )
            if model_form.is_valid():
                with transaction.atomic():
                    # both create and fulfill the services field
                    order = model_form.save()
                    service_queryset = Service.objects.filter(id__in=request.POST.getlist("services"))
                    order.services.add(*service_queryset)
                    print("cleaners", request.POST.getlist("cleaners"))
                    order.cleaners.set(request.POST.getlist("cleaners"))

                    order.save()
                return model_form.errors
            return model_form.errors
        return form.errors

    @staticmethod
    def validate_url_params_relativity(client_pk: int, order_pk: int):
        """Prevent order for being shown on not owner's page."""
        order = get_object_or_404(Order, pk=order_pk)
        if order.client_data_id == client_pk:
            return True
        return False

    @staticmethod
    def update_order(request_data: Dict, order_pk: int) -> Union[None, Order]:
        """Modify client_address and service's list of particular order."""
        print("request_data", request_data)
        order = get_object_or_404(Order, pk=order_pk)
        form = OrderCreationForm(request_data)
        if form.is_valid():
            with transaction.atomic():
                order.client_address = form.cleaned_data["client_address"]
                order.cost = OrderService.calculate_order_cost(request_data.getlist("services"))
                order.save()
                order.services.set(request_data.getlist("services"))
                order.cleaners.set(request_data.getlist("cleaners"))
            return order
        return None

    @staticmethod
    def calculate_order_cost(services: List[str]):
        services = Service.objects.filter(id__in=services)
        rs = services.select_related("serv_type").aggregate(Sum("serv_type__cost"))
        return rs["serv_type__cost__sum"]
