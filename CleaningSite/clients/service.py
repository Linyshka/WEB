from django.db import transaction

from companies.forms import CompanyModelForm

from .forms import ClientCreationForm, ClientModelForm, ClientModelFormWithoutCompany


class ClientService:
    def validate_and_create_client(self, request_data):
        generic_form = ClientCreationForm(request_data)
        if generic_form.is_valid():
            client_form = ClientModelFormWithoutCompany(
                {
                    "first_name": generic_form.cleaned_data["first_name"],
                    "last_name": generic_form.cleaned_data["last_name"],
                    "surname": generic_form.cleaned_data["surname"],
                    "age": generic_form.cleaned_data["age"],
                }
            )
            company_form = CompanyModelForm(
                {
                    "is_juridical": generic_form.cleaned_data["is_juridical"],
                    "is_individual": generic_form.cleaned_data["is_individual"],
                    "contact_phone": generic_form.cleaned_data["contact_phone"],
                    "company_name": generic_form.cleaned_data["company_name"],
                }
            )

            if client_form.is_valid() and company_form.is_valid():
                with transaction.atomic():
                    company = company_form.save()
                    ClientModelForm(client_form.cleaned_data | {"company": company}).save()
                return True
            print(client_form.errors)
            print(company_form.errors)
        print(generic_form.errors)
        return False
