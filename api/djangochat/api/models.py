from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# As recommended here: https://docs.djangoproject.com/en/2.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
class User(AbstractUser):
    pass
    
class Server(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class Channel(models.Model):
    name = models.CharField(max_length=200)
    direct_type = models.BooleanField()
    server = models.ForeignKey(
        Server, null=True, on_delete=models.CASCADE)
    user_one = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE,
        related_name='user_one')
    user_two = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE,
        related_name='user_two')

    def __str__(self):
        return self.name

class Message(models.Model):
    text = models.TextField()
    date = models.DateTimeField()
    channel = models.ForeignKey(
        Channel, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return "TODO Define"

class Reaction(models.Model):
    reaction = models.IntegerField()
    date = models.DateTimeField()
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE)
    message = models.ForeignKey(
        Message, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.reaction)

class Friend(models.Model):
    user_one = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE,
        related_name='friend_one')
    user_two = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE,
        related_name='friend_two')

    def __str__(self):
        return "TODO Define"
        
class Right(models.Model):
    # 1-Emperor -> Add user, ban a user + Master rights
    # 2-Master -> Creation of chat + Padawan rights
    # 3-Padawan -> Send messages
    right = models.IntegerField()
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE)
    server = models.ForeignKey(
        Server, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return "TODO Define"
