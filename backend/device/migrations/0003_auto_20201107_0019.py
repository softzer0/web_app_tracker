# Generated by Django 3.1.2 on 2020-11-07 00:19

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('device', '0002_auto_20201028_1349'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='device',
            unique_together={('identifier', 'user')},
        ),
    ]
