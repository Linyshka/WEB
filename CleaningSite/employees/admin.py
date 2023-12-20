from django.contrib import admin

from .forms import EmployeeCreationForm
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    form = EmployeeCreationForm
    list_filter = (
        "first_name",
        "last_name",
        "email",
        "experience",
        "date_of_birth",
        "applied_at",
        "role",
    )
