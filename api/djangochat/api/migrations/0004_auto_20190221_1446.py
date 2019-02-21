# Generated by Django 2.1.6 on 2019-02-21 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_message_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='name',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='channel',
            name='server',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Server'),
        ),
    ]
