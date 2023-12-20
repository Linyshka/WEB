from django.contrib import admin  # noqa: F401

from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_filter = ("subscription_date", "is_juridical", "is_individual", "company_name")
