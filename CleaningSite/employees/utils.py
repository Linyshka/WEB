from django.contrib.auth.mixins import UserPassesTestMixin


class IsAdminPermissionMixin(UserPassesTestMixin):
    """Check if user is administrator."""

    def test_func(self):
        return self.request.user.is_staff or self.request.user.is_superuser
