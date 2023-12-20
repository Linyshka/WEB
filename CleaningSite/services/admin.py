from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_filter = ("name",)
