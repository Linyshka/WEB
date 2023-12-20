from django import forms

from clients.models import Client
from employees.models import Employee, Roles
from services.models import Service

from .models import Order


class OrderModelForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ("client_address", "order_code", "client_data", "cost", "cleaners")


class OrderCreateForm(forms.Form):
    services = forms.ModelMultipleChoiceField(
        queryset=Service.objects.all(), widget=forms.CheckboxSelectMultiple, required=False
    )
    client_address = forms.CharField()
    client = forms.ModelChoiceField(queryset=Client.objects.all())


class OrderCreationForm(forms.Form):
    services = forms.ModelMultipleChoiceField(
        queryset=Service.objects.all(), widget=forms.CheckboxSelectMultiple, required=False
    )
    cleaners = forms.ModelMultipleChoiceField(
        queryset=Employee.objects.filter(role=Roles.cleaner), widget=forms.CheckboxSelectMultiple, required=False
    )
    client_address = forms.CharField()

    def __init__(self, *args, **kwargs):
        if kwargs.get("substitute_qs"):
            kwargs.pop("substitute_qs")
            qs = kwargs.pop("services")
            super().__init__(*args, **kwargs)
            self.fields["services"].queryset = qs
        else:
            super().__init__(*args, **kwargs)
