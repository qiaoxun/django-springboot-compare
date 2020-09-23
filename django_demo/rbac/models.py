from datetime import timezone

from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=30, verbose_name="Name")
    first_name = models.CharField(max_length=30, verbose_name="First Name")
    last_name = models.CharField(max_length=30, verbose_name="Last Name")
    password = models.CharField(max_length=30, verbose_name="Password")
    email = models.EmailField(max_length=50, verbose_name="Email")
    organization = models.ForeignKey("Organization", null=True, blank=True, on_delete=models.SET_NULL,
                                     verbose_name="Organization")

    class Meta:
        verbose_name = "User"
        verbose_name_plural = verbose_name
        db_table = 'django_user'


class Organization(models.Model):
    """
    组织架构
    """
    organization_type_choices = (
        ("company", "Company"),
        ("department", "Department")
    )
    name = models.CharField(max_length=60, verbose_name="Name")
    type = models.CharField(max_length=20, choices=organization_type_choices, default="company", verbose_name="Type")
    pid = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL, verbose_name="Parent Org")

    class Meta:
        verbose_name = "Organization"
        verbose_name_plural = verbose_name
        db_table = 'django_organization'

    def __str__(self):
        return self.name
