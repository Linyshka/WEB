from django.urls import path

from .views import (
    EmployeePublicListView,  # EmployeeDeleteView, EmployeeListView, EmployeeUpdateView,
)

urlpatterns = [
    # path(
    #     "",
    #     EmployeeListView.as_view(),
    #     name="employee_list",
    # ),
    # path("<int:pk>", EmployeeUpdateView.as_view(), name="employee_detail"),
    # path("<int:pk>/delete", EmployeeDeleteView.as_view(), name="employee_delete"),
    path("contacts/", EmployeePublicListView.as_view(), name="employee_public_list")
]
