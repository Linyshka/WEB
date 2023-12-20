from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.generic import DeleteView, DetailView, ListView, UpdateView

from services.models import Service
from services.utils import IsManagerMixin

from .forms import OrderCreationForm
from .models import Order
from .service import OrderService


class OrderListView(IsManagerMixin, ListView):
    model = Order
    template_name = "orders/order_list.html"
    form_class = OrderCreationForm

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context["form"] = self.form_class(
            services=Service.objects.filter(client_id=self.kwargs["client_pk"]),
            substitute_qs=True,
        )
        context["client_pk"] = self.kwargs["client_pk"]
        return context

    def get(self, request, client_pk, **kwargs):
        self.object_list = self.model.objects.filter(client_data_id=client_pk)

        context = self.get_context_data()
        return render(
            request,
            self.template_name,
            context,
        )

    def post(self, request, client_pk):
        errors = OrderService().validate_and_create_order(request, client_pk)
        context = {"error": str(errors)}

        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=Order.objects.filter(client_data_id=client_pk)) | context,
        )


class OrderUpdateView(IsManagerMixin, UpdateView):
    model = Order
    form_class = OrderCreationForm
    template_name = "orders/order_detail.html"

    def get_custom_context_data(self, order: Order = None, **kwargs):
        context = {}
        if order is None:
            order = get_object_or_404(self.model, pk=self.kwargs["pk"])
        context["form"] = OrderCreationForm(
            {
                "services": order.services.all(),
                "client_address": order.client_address,
                "cleaners": order.cleaners.all(),
            },
            services=Service.objects.filter(client_id=self.kwargs["client_pk"]),
            substitute_qs=True,
        )
        context["object"] = self.get_object()
        return context

    def get(self, request, client_pk, pk, **kwargs):
        if OrderService().validate_url_params_relativity(client_pk, pk):
            return render(request, self.template_name, self.get_custom_context_data())
        return Http404()

    def post(self, request, client_pk, pk, **kwargs):
        if OrderService.validate_url_params_relativity(client_pk, pk):
            order = OrderService.update_order(request.POST, pk)
            context = {}

            if order:
                context["message"] = "Order was successfully updated."
            else:
                context["error"] = "Order form is not valid. Order wasn't updated correctly."

            return render(
                request,
                self.template_name,
                self.get_custom_context_data() | context,
            )
        return Http404()


class OrderDeleteView(IsManagerMixin, DeleteView):
    model = Order

    def get_success_url(self):
        return reverse("order_list", kwargs={"client_pk": self.kwargs["client_pk"]})

    def post(self, request, client_pk, pk):
        if OrderService.validate_url_params_relativity(client_pk, pk):
            order = self.get_object()
            order.delete()
            return redirect(self.get_success_url())


class OrderAllListView(LoginRequiredMixin, ListView):
    model = Order
    template_name = "orders/order_global_list.html"

    def get_queryset(self):
        if self.request.user.is_cleaner():
            return self.request.user.orders.all()
        elif self.request.user.is_manager():
            return self.model.objects.all()


class OrderDetailView(LoginRequiredMixin, DetailView):
    model = Order
    template_name = "orders/order_detail_info.html"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context["service_list"] = context["object"].services.all()
        context["cleaners"] = context["object"].cleaners.all()
        print(context["object"].cleaners.all())
        context["client"] = context["object"].client_data
        return context
