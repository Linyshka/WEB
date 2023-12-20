from django.forms import ModelForm

from .models import EmployeeSpecialization


class SpecializationCreateForm(ModelForm):
    class Meta:
        model = EmployeeSpecialization
        fields = ("name",)
