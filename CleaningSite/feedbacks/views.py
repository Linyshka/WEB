from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView
from .models import Feedback
from .forms import FeedbackCreateForm
from django.urls import reverse


class FeedbackListView(ListView):
    model = Feedback
    template_name = "feedbacks/feedback_list.html"


class FeedbackCreateView(CreateView):
    model = Feedback
    template_name = "feedbacks/feedback_detail.html"
    form_class = FeedbackCreateForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse("feedback_list"))
        else:
            return render(
                request, self.template_name,
                self.get_context_data() | {"form": form},
            )
