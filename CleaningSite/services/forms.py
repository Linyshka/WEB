from django import forms

from .models import Service


class ServiceCreationForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ("name", "comment", "serv_type")
