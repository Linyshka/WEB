from django import forms
from django.contrib.auth.forms import UserCreationForm

from employee_specializations.models import EmployeeSpecialization
from orders.models import Order

from .models import Employee


class EmployeeCreationForm(UserCreationForm):
    date_of_birth = forms.DateField(widget=forms.DateInput(format="%d/%m/%Y"), input_formats=["%d/%m/%Y"])

    class Meta:
        model = Employee
        fields = (
            "first_name",
            "last_name",
            "surname",
            "experience",
            "date_of_birth",
            "username",
            "email",
            "password1",
            "password2",
            "role",
            "image",
        )

    # def save(self, **kwargs):
    #     if self.is_valid():
    #         self.cleaned_data.pop('password1')
    #         emp = Employee.objects.create_user(**self.cleaned_data)
    #         emp.password = make_password(emp.password)
    #         return emp.save()
    #
    #     else:
    #         raise ValueError("user data is not valid")


class EmployeeModelForm(forms.ModelForm):
    specializations = forms.ModelMultipleChoiceField(queryset=EmployeeSpecialization.objects.all(), required=False)
    orders = forms.ModelMultipleChoiceField(queryset=Order.objects.all(), required=False)
    date_of_birth = forms.DateField(widget=forms.DateInput(format="%d/%m/%Y"), input_formats=["%d/%m/%Y"])

    class Meta:
        model = Employee
        exclude = (
            "specializations",
            "orders",
        )
