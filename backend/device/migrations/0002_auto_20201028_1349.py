# Generated by Django 3.1.2 on 2020-10-28 13:49

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('device', '0001_squashed_0002_auto_20201024_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='identifier',
            field=models.CharField(max_length=13, validators=[django.core.validators.MinLengthValidator(13)]),
        ),
        migrations.AlterField(
            model_name='device',
            name='secret',
            field=models.CharField(max_length=32, validators=[django.core.validators.MinLengthValidator(32)]),
        ),
    ]
