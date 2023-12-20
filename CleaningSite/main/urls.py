from django.urls import path

from .views import index, AboutUsTemplateView, PrivacyPolicyTemplateView, OtherTemplateView

urlpatterns = [
    path("", index, name="main_page"),
    path("about_us/", AboutUsTemplateView.as_view(), name="about_us"),
    path("privacy_policy/", PrivacyPolicyTemplateView.as_view(), name="privacy_policy"),
    path("other/", OtherTemplateView.as_view(), name="other")
]