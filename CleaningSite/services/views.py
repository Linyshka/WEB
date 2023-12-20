from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.generic import DeleteView, ListView, UpdateView

from clients.models import Client

from .diagram import build_plot
from .forms import ServiceCreationForm
from .models import Service
from .service import ServicesService
from .statistic_service import StatService
from .utils import IsManagerMixin


class ServiceListView(IsManagerMixin, ListView):
    model = Service
    template_name = "services/service_list.html"
    form_class = ServiceCreationForm

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context["form"] = self.form_class()
        context["object_list"] = Service.objects.filter(client_id=self.kwargs["client_pk"])
        context["client_pk"] = self.kwargs["client_pk"]
        return context

    def post(self, request, client_pk):
        # check if client exist
        get_object_or_404(Client, id=client_pk)
        form = self.form_class(request.POST)
        context = {}
        if form.is_valid():
            ServicesService().save_service(form, client_pk)
            context["message"] = "Service was successfully created."
        else:
            context["error"] = "Form is invalid. Can't create service."

        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=Service.objects.filter(client_id=self.kwargs["client_pk"])) | context,
        )


class ServiceUpdateView(IsManagerMixin, UpdateView):
    model = Service
    template_name = "services/service_detail.html"
    form_class = ServiceCreationForm

    def get(self, request, client_pk, pk):
        service = ServicesService().get_client_service(client_pk, pk)
        if not service:
            raise Http404("No such service.")
        context = {
            "form": ServiceCreationForm(instance=service),
            "object": service,
        }
        return render(request, self.template_name, context)

    def get_success_url(self):
        return reverse("service_list", kwargs={"client_pk": self.kwargs["client_pk"]})

    def post(self, request, *args, **kwargs):
        service = ServicesService().get_client_service(kwargs["client_pk"], kwargs["pk"])
        if not service:
            raise Http404("No such service.")

        return super().post(request, *args, **kwargs)


class ServiceDeleteView(IsManagerMixin, DeleteView):
    model = Service

    def post(self, request, *args, **kwargs):
        self.object = ServicesService().get_client_service(kwargs["client_pk"], kwargs["pk"])
        if not self.object:
            raise Http404("No such service.")
        return self.form_valid(None)

    def get_success_url(self):
        return reverse("service_list", kwargs={"client_pk": self.kwargs["client_pk"]})


@login_required
def show_plot(request):
    filename = build_plot()
    context = {"filename": "/" + filename}
    context["mode"], context["median"], context["average"] = StatService.average_mode_median_sale_incomes()
    context["client_list"], context["total_cost"] = StatService.list_clients_and_sum_sale_incomes()
    context["age_average"], context["age_median"] = StatService.average_and_median_client_age()
    return render(
        request,
        "services/plot_page.html",
        context,
    )
