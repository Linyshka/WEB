# Generated by Django 4.2.5 on 2023-09-07 00:19

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ClientInfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("surname", models.CharField(max_length=50)),
                ("subscription_date", models.DateField(auto_now_add=True)),
                ("is_juridical", models.BooleanField(default=False)),
                ("is_individual", models.BooleanField(default=False)),
                ("contact_phone", models.CharField(max_length=13)),
                ("company_name", models.CharField(max_length=50)),
            ],
        ),
    ]
