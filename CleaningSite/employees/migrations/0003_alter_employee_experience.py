# Generated by Django 4.2.5 on 2023-09-09 06:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("employees", "0002_alter_employee_options_employee_check_employee_age"),
    ]

    operations = [
        migrations.AlterField(
            model_name="employee",
            name="experience",
            field=models.DecimalField(decimal_places=1, max_digits=4, null=True),
        ),
    ]
