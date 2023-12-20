from typing import Union

from django import forms
from django.shortcuts import get_object_or_404

from clients.models import Client

from .models import Service


class ServicesService:
    @staticmethod
    def save_service(form: forms.ModelForm, client_id: int) -> Service:
        client = get_object_or_404(Client, id=client_id)
        service = form.save()
        service.client = client
        return service.save()

    @staticmethod
    def get_client_service(client_pk, service_pk) -> Union[Service, None]:
        client = get_object_or_404(Client, pk=client_pk)
        service = get_object_or_404(Service, pk=service_pk)
        if service in client.services.all():
            return service
        return None
