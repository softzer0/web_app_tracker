from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator
from django.db import models


class Device(models.Model):
    identifier = models.CharField(max_length=13, validators=[MinLengthValidator(13)])
    secret = models.CharField(max_length=32, validators=[MinLengthValidator(32)])
    user = models.ForeignKey(get_user_model(), blank=True, null=True, on_delete=models.SET_NULL)
    label = models.CharField(max_length=32, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('identifier', 'user')