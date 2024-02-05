from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer, \
    UserDetailsSerializer as DefaultUserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
from allauth.account.utils import send_email_confirmation
from re import compile as re_compile

from .models import User

NAME_REGEX = re_compile(r'^\w+$')


class NoUsername:
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        self.fields.pop('username')


class LoginSerializer(NoUsername, DefaultLoginSerializer):
    email = serializers.EmailField(required=True)


class RegisterSerializer(NoUsername, DefaultRegisterSerializer):
    pass
    # first_name = serializers.CharField(max_length=20)
    # last_name = serializers.CharField(max_length=20)
    #
    # def validate(self, data):
    #     super().validate(data)
    #     if not NAME_REGEX.match(data['first_name']) or not NAME_REGEX.match(data['last_name']):
    #         raise serializers.ValidationError("Invalid name!")
    #     return data
    #
    # def get_cleaned_data(self):
    #     return {
    #         **super().get_cleaned_data(), **{
    #             'first_name': self.validated_data.get('first_name', ''),
    #             'last_name': self.validated_data.get('last_name', '')}}


class UserDetailsSerializer(DefaultUserDetailsSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')
        read_only_fields = ('email',)


class ResendEmailConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        try:
            send_email_confirmation(self.context['request'], User.objects.get_by_natural_key(attrs['email']))
        except:
            pass
        return attrs

    def create(self, validated_data):
        return validated_data