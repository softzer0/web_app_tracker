from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from backend.mixins import AllowPUTAsCreateMixin
from .models import Device
from .permissions import IsOwnerOrReadOnlyIfUser
from .serializers import DeviceSerializer


class DeviceViewSet(AllowPUTAsCreateMixin, ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnlyIfUser]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Device.objects.none()
        return Device.objects.filter(user=self.request.user)