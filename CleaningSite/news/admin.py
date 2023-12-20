from django.contrib import admin

from .models import New


@admin.register(New)
class NewAdmin(admin.ModelAdmin):
    list_filter = ("title",)
