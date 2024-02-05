from rest_framework import serializers
from device.serializers import DeviceSerializer
from .models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        if 'nodevice' not in self.context and self.context['request'].method == 'GET':
            self.fields['device'] = DeviceSerializer(context={'location': None})
        elif 'nodevice' in self.context:
            self.fields.pop('device')