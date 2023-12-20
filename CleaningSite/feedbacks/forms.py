from django import forms
from .models import Feedback


class FeedbackCreateForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ("client_name", "content", "mark")
