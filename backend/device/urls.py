from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'device', DeviceViewSet, basename='Device')

urlpatterns = router.urls