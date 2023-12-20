from django import forms

from service_types.models import ServiceType


class ServiceTypeCreationForm(forms.ModelForm):
    class Meta:
        model = ServiceType
        fields = ("name",)
