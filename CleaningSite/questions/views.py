from django.shortcuts import render
from django.views.generic import ListView
from .models import Question
from .forms import QuestionModelForm


class QuestionListView(ListView):
    model = Question
    template_name = "questions/question_list.html"

    def get_queryset(self):
        return self.model.objects.filter(to_show_answer=True)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context["form"] = QuestionModelForm
        return context

    def post(self, request):
        form = QuestionModelForm(request.POST)

        context = {}
        if form.is_valid():
            form.save()
            context["message"] = "Successfully created"
        else:
            context["form"] = form
        return render(
            request,
            self.template_name,
            self.get_context_data(object_list=self.get_queryset()) | context
        )
