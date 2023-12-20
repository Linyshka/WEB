from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import DeleteView, ListView, UpdateView

from services.utils import IsManagerMixin

from .forms import ClientCreationForm, ClientModelFormWithoutCompany
from .models import Client
from .service import ClientService


class ClientInfoListView(IsManagerMixin, ListView):
    model = Client
    template_name = "clients/client_list.html"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context["form"] = ClientCreationForm
        return context

    def post(self, request):
        created = ClientService().validate_and_create_client(request.POST)
        if created:
            context = {"message": "Created"}
        else:
            context = {"message": "Not created"}
        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=Client.objects.all()) | context,
        )


class ClientInfoUpdateView(IsManagerMixin, UpdateView):
    model = Client
    template_name = "clients/client_detail.html"
    form_class = ClientModelFormWithoutCompany
    success_url = reverse_lazy("client_info_list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.form_class(instance=self.get_object())
        return context


class ClientInfoDeleteView(IsManagerMixin, DeleteView):
    model = Client
    success_url = reverse_lazy("client_info_list")
