from django.contrib import admin

from .models import Message, Server, Chat, Friend, Right, Reaction, User

# Register your models here.

admin.site.register(Message)
admin.site.register(Server)
admin.site.register(Chat)
admin.site.register(Friend)
admin.site.register(Reaction)
admin.site.register(User)
admin.site.register(Right)