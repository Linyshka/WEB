from django.urls import path  # noqa: F401

from .views import ClientInfoDeleteView, ClientInfoListView, ClientInfoUpdateView

urlpatterns = [
    path("", ClientInfoListView.as_view(), name="client_info_list"),
    path("<int:pk>", ClientInfoUpdateView.as_view(), name="client_info_detail"),
    path("<int:pk>/delete", ClientInfoDeleteView.as_view(), name="client_info_delete"),
]
