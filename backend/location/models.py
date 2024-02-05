from django.contrib.gis.db.models import PointField
from django.db import models


class Location(models.Model):
    device = models.ForeignKey('device.Device', on_delete=models.CASCADE)
    coordinates = PointField()
    created = models.DateTimeField(auto_now_add=True)