from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import New


class NewListView(ListView):
    model = New
    template_name = "news/new_list.html"


class NewDetailView(DetailView):
    model = New
    template_name = "news/new_detail.html"
