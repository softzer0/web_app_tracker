from django.db.models import Max
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Location
from .permissions import IsStaffOrReadOnly
from .serializers import LocationSerializer


class LocationViewSet(ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated, IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('device',)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Location.objects.none()
        return Location.objects.filter(device__user=self.request.user).order_by('device', '-created').distinct('device')