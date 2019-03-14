from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime


# Create your models here.


class Server(models.Model):
    name = models.CharField(max_length=200)
    user_adding_right = models.IntegerField(
        validators=[MaxValueValidator(3), MinValueValidator(1)])

    def __str__(self):
        return self.name


# As recommended here: https://docs.djangoproject.com/en/2.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
class User(AbstractUser):
    servers = models.ManyToManyField(Server, through='Right')
    friends = models.ManyToManyField('self', blank=True)


class Channel(models.Model):
    name = models.CharField(max_length=200, blank=True)
    direct_type = models.BooleanField()
    server = models.ForeignKey(
        Server, null=True, on_delete=models.CASCADE, blank=True)
    user_one = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE,
        related_name='user_one', blank=True)
    user_two = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE,
        related_name='user_two', blank=True)

    def __str__(self):
        if self.direct_type:
            return f"{self.user_one} - {self.user_two}"
        else:
            return f"{self.server} : {self.name}"


class Message(models.Model):
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now)
    channel = models.ForeignKey(
        Channel, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.channel} - {self.user} : {self.text}"


class Reaction(models.Model):
    reaction = models.PositiveIntegerField()
    date = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE)
    message = models.ForeignKey(
        Message, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.message} - {self.user} : {str(self.reaction)}"

class Right(models.Model):
    # 1-Emperor -> Add user, ban a user + Master rights
    # 2-Master -> Creation of chat + Padawan rights
    # 3-Padawan -> Send messages
    right = models.IntegerField(
        validators=[MaxValueValidator(3), MinValueValidator(1)])
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE)
    server = models.ForeignKey(
        Server, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.server} - {self.user} : {self.right}"
