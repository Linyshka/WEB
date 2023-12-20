from django.contrib import admin

from .models import Vacancies


@admin.register(Vacancies)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_filter = ("placement", "name", "busyness")
