from django.contrib import admin

from services.models import Service

from .models import ServiceType


class ServiceInline(admin.TabularInline):
    model = Service


@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_filter = ("cost", "name")
    inlines = [ServiceInline]
