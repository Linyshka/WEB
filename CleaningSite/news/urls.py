from django.urls import path
from .views import NewListView, NewDetailView


urlpatterns = [
    path("", NewListView.as_view(), name="new_list"),
    path("<int:pk>/", NewDetailView.as_view(), name="new_detail"),
]