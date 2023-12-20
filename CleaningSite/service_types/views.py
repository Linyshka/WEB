from django.db.models import Max
from django.shortcuts import render
from django.views.generic import ListView

from promocodes.models import Promocodes

from .models import ServiceType


class ServiceTypeListView(ListView):
    model = ServiceType
    template_name = "service_types/service_type_list.html"

    def get(self, request):
        ranger = request.GET.get("ranger")
        if ranger:
            self.object_list = self.model.objects.filter(cost__lte=ranger).order_by("cost")
        else:
            self.object_list = self.model.objects.order_by("cost")
        context = {}
        if ranger:
            min_max_queryset = self.model.objects.order_by("cost")
        else:
            min_max_queryset = self.object_list

        context["min_cost"] = min_max_queryset.first().cost if len(min_max_queryset) else 0
        context["max_cost"] = min_max_queryset.last().cost if len(min_max_queryset) else 0
        context["max_promocode_percent"] = Promocodes.objects.filter(is_archived=False).aggregate(Max("percent"))[
            "percent__max"
        ]
        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=self.object_list) | context,
        )
