# Generated by Django 4.2 on 2024-08-14 03:33

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Query",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("question", models.CharField(max_length=255)),
                ("intent", models.CharField(max_length=100)),
                ("information", models.TimeField(max_length=500)),
            ],
        ),
    ]
