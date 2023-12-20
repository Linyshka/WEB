from django.contrib.auth.mixins import UserPassesTestMixin


class IsAuthenticatedMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_authenticated


class IsCleanerMixin(IsAuthenticatedMixin):
    def test_func(self):
        authenticated = super().test_func()
        return authenticated and self.request.user.is_cleaner()


class IsManagerMixin(IsAuthenticatedMixin):
    def test_func(self):
        authenticated = super().test_func()
        return authenticated and self.request.user.is_manager()
