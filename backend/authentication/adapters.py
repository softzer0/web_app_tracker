from allauth.account.adapter import DefaultAccountAdapter
from django.contrib.sites.models import Site


class AccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        return '{schema}://{domain}/confirm-registration/{key}'.format(schema='https' if request.is_secure() else 'http', domain=Site.objects.get_current().domain, key=emailconfirmation.key)

    def respond_email_verification_sent(self, request, user):
        pass