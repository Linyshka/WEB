from django.contrib import admin

from .models import Order


class OrderInline(admin.TabularInline):
    model = Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_filter = ("order_code", "created_at", "cost")
