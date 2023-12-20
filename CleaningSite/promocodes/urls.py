from django.urls import path
from .views import PromocodesListView

urlpatterns = [
    path("", PromocodesListView.as_view(), name="promocode_list")
]