from django import forms
from .models import Question


class QuestionModelForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ("text",)
