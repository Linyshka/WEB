from django.shortcuts import render
from django.views.generic import ListView
from .models import Vacancies


class VacancyListView(ListView):
    model = Vacancies
    template_name = "vacancies/vacancy_list.html"
