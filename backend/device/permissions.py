from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnlyIfUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or not obj.user:
            return True

        return obj.user == request.user