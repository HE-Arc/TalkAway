from django.contrib import admin

from .models import Message, Server, Channel, Right, Reaction, User, Friend

# Register your models here.

admin.site.register(Message)
admin.site.register(Server)
admin.site.register(Channel)
admin.site.register(Reaction)
admin.site.register(User)
admin.site.register(Right)
admin.site.register(Friend)