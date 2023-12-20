from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, UpdateView

from employees.utils import IsAdminPermissionMixin

from .forms import SpecializationCreateForm
from .models import EmployeeSpecialization


class EmployeeSpecializationListView(LoginRequiredMixin, ListView):
    template_name = "employee_specializations/specializations_list.html"
    model = EmployeeSpecialization

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = SpecializationCreateForm
        return context

    def post(self, request):
        form = SpecializationCreateForm(request.POST)

        if form.is_valid():
            form.save()
        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=EmployeeSpecialization.objects.all()),
        )


class EmployeeSpecializationUpdateView(IsAdminPermissionMixin, UpdateView):
    template_name = "employee_specializations/specialization_detail.html"
    success_url = reverse_lazy("employee_specialization_list")
    model = EmployeeSpecialization
    form_class = SpecializationCreateForm
