from django import forms

from .models import Client


class ClientModelFormWithoutCompany(forms.ModelForm):
    class Meta:
        model = Client
        fields = ("first_name", "last_name", "surname", "age")


class ClientModelForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = "__all__"


class ClientCreationForm(forms.Form):
    first_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)
    surname = forms.CharField(max_length=50)
    age = forms.IntegerField()
    is_juridical = forms.BooleanField(required=False)  # является ли компания юридическим лицом
    is_individual = forms.BooleanField(required=False)  # является ли компания физическим лицом
    contact_phone = forms.CharField(max_length=19)  # контактный телефон компании
    company_name = forms.CharField(max_length=50)  # имя компании
