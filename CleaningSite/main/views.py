from django.shortcuts import render
from django.views.generic import TemplateView
from httpx import Client
from articles.models import Article


def index(request):
    article = Article.objects.order_by("-added_at").first()
    context = {}
    if article:
        context['article_title'] = article.title
        context['article_description'] = article.description[:150]

    if request.user.is_authenticated:
        response = Client().get("https://catfact.ninja/fact")
        context['fact'] = response.json()['fact']
        response = Client().get(f"https://api.agify.io/?name={request.user.first_name}")
        context['age_by_name'] = response.json()['age']

    return render(
        request,
        "main/main.html",
        context,
    )


class AboutUsTemplateView(TemplateView):
    template_name = "main/about_company.html"


class PrivacyPolicyTemplateView(TemplateView):
    template_name = "main/privacy_policy.html"


class OtherTemplateView(TemplateView):
    template_name = "main/other.html"
