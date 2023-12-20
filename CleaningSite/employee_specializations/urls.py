from django.urls import path

from .views import EmployeeSpecializationListView, EmployeeSpecializationUpdateView

urlpatterns = [
    path("", EmployeeSpecializationListView.as_view(), name="employee_specialization_list"),
    path("<int:pk>", EmployeeSpecializationUpdateView.as_view(), name="employee_specialization_detail"),
]
