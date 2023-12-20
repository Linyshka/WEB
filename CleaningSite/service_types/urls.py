from django.urls import path  # noqa: F401

from .views import ServiceTypeListView

urlpatterns = [
    path("", ServiceTypeListView.as_view(), name="service_types_list"),
]
