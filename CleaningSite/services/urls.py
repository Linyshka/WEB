from django.urls import path  # noqa: F401

from .views import ServiceDeleteView, ServiceListView, ServiceUpdateView, show_plot

urlpatterns = [
    path("<int:client_pk>", ServiceListView.as_view(), name="service_list"),
    path("<int:client_pk>/<int:pk>", ServiceUpdateView.as_view(), name="service_detail"),
    path("<int:client_pk>/<int:pk>/delete", ServiceDeleteView.as_view(), name="service_delete"),
    path("plot/", show_plot, name="stat_plot"),
]
