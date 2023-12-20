from django.views.generic import ListView

from .models import Employee


class EmployeePublicListView(ListView):
    model = Employee
    template_name = "employees/employee_public_list.html"
