# djangochat/api/schema.py
import graphene

from graphene_django.types import DjangoObjectType

from .models import Message, Server, Channel, Friend, Right, Reaction, User


class MessageType(DjangoObjectType):
    class Meta:
        model = Message

class ServerType(DjangoObjectType):
    class Meta:
        model = Server

class ChannelType(DjangoObjectType):
    class Meta:
        model = Channel

class FriendType(DjangoObjectType):
    class Meta:
        model = Friend

class RightType(DjangoObjectType):
    class Meta:
        model = Right
        
class ReactionType(DjangoObjectType):
    class Meta:
        model = Reaction
        
class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(object):
    all_users = graphene.List(UserType)
    all_servers = graphene.List(ServerType)
    all_channels = graphene.List(ChannelType)
    all_friends = graphene.List(FriendType)
    all_rights = graphene.List(RightType)
    all_reactions = graphene.List(ReactionType)
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_all_server(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return Server.objects.select_related('channel').all()
