from django.urls import path  # noqa: F401

from .views import (
    OrderAllListView,
    OrderDeleteView,
    OrderDetailView,
    OrderListView,
    OrderUpdateView,
)

urlpatterns = [
    path("<int:client_pk>", OrderListView.as_view(), name="order_list"),
    path("<int:client_pk>/<int:pk>", OrderUpdateView.as_view(), name="order_detail"),
    path("<int:client_pk>/<int:pk>/delete", OrderDeleteView.as_view(), name="order_delete"),
    path("", OrderAllListView.as_view(), name="order_global_list"),
    path("<int:pk>/detail", OrderDetailView.as_view(), name="order_detail_info"),
]
