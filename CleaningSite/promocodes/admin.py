from django.contrib import admin

from .models import Promocodes


@admin.register(Promocodes)
class PromocodeAdmin(admin.ModelAdmin):
    list_filter = ("name", "is_archived", "created_at", "start_date", "finish_date")
