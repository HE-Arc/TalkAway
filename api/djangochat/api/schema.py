# djangochat/api/schema.py
from django.contrib.auth import get_user_model
import graphene

from graphene_django.types import DjangoObjectType

from .models import Message, Server, Channel, Friend, Right, Reaction


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
        model = get_user_model()

class Query(object):
    all_users = graphene.List(UserType)
    all_servers = graphene.List(ServerType)
    all_channels = graphene.List(ChannelType)
    all_friends = graphene.List(FriendType)
    all_rights = graphene.List(RightType)
    all_reactions = graphene.List(ReactionType)
    all_users = graphene.List(UserType)

    def resolve_all_channels(self, info, **kwargs):
        return Channel.objects.all()

    def resolve_all_servers(self, info, **kwargs):
        return Server.objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(
            user=user,
        )

class CreateServer(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    user_adding_right = graphene.Int()

    class Arguments:
        name = graphene.String()
        user_adding_right = graphene.Int()

    def mutate(self, info, name, user_adding_right):
        server = Server(name=name, user_adding_right=user_adding_right)
        server.save()

        return CreateServer(
            id=server.id,
            name=server.name,
            user_adding_right=server.user_adding_right,
        )

class Mutation(graphene.ObjectType):
    create_server = CreateServer.Field()
    create_user = CreateUser.Field()
