from django.contrib import admin

from orders.admin import OrderInline
from service_types.admin import ServiceInline

from .models import Client


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_filter = ("first_name", "last_name", "surname", "age", "company")
    inlines = [ServiceInline, OrderInline]
