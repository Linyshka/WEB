from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # built in
    path("admin/", admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    # own
    path("clients/", include("clients.urls")),
    path("specializations/", include("employee_specializations.urls")),
    path("employees/", include("employees.urls")),
    path("orders/", include("orders.urls")),
    path("service_types/", include("service_types.urls")),
    path("services/", include("services.urls")),
    path("articles/", include("articles.urls")),
    path("", include("main.urls")),
    path("news/", include("news.urls")),
    path("questions/", include("questions.urls")),
    path("vacancies/", include("vacancies.urls")),
    path("feedbacks/", include("feedbacks.urls")),
    path("promocodes/", include("promocodes.urls")),
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT,
)
