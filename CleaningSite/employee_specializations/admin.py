from django.contrib import admin

from .models import EmployeeSpecialization


@admin.register(EmployeeSpecialization)
class CompanyAdmin(admin.ModelAdmin):
    list_filter = ("name",)
