from django import forms

from .models import Company


class CompanyModelForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ("is_juridical", "is_individual", "contact_phone", "company_name")
