from django.views.generic import ListView

from .models import Promocodes


class PromocodesListView(ListView):
    model = Promocodes
    template_name = "promocodes/promocode_list.html"

    def get_queryset(self):
        return self.model.objects.filter(is_archived=False)
