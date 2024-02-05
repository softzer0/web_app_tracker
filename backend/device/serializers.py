from rest_framework import serializers
from .models import Device
from location.models import Location
from location import serializers as location_serializers


class DeviceSerializer(serializers.ModelSerializer):
    last_location = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        if 'location' in self.context:
            self.fields.pop('secret')
            self.fields.pop('created')
        if 'request' not in self.context or not self.context['request'].user.is_staff:
            self.fields['user'] = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def get_last_location(self, obj):
        context = self.context.copy()
        context['nodevice'] = None
        last_location = Location.objects.filter(device=obj).order_by('-created').first()
        return location_serializers.LocationSerializer(last_location, context=context).data if last_location else None