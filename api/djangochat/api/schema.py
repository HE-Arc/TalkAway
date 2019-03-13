# djangochat/api/schema.py

import graphene
from graphene_django.types import DjangoObjectType
from .models import Message, Server, Channel, Right, Reaction
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required, user_passes_test


class MessageType(DjangoObjectType):
    class Meta:
        model = Message


class ServerType(DjangoObjectType):
    class Meta:
        model = Server


class ChannelType(DjangoObjectType):
    class Meta:
        model = Channel


class RightType(DjangoObjectType):
    class Meta:
        model = Right


class ReactionType(DjangoObjectType):
    class Meta:
        model = Reaction


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    all_messages_by_channel = graphene.List(
        MessageType, channel_id=graphene.Int()
    )
    
    my_servers = graphene.List(ServerType)
    my_friends = graphene.List(UserType)

    server_channels = graphene.List(
        ChannelType, server_id=graphene.Int()
    )

    # viewer = graphene.Field(UserType)
    # @login_required
    # def resolve_viewer(self, info, **kwargs):
    #     return info.context.user

    @login_required
    def resolve_my_friends(self, info, **kwargs):
        return info.context.user.friends.all()
    
    @login_required
    def resolve_my_servers(self, info, **kwargs):
        return info.context.user.servers.all()

    @login_required
    def resolve_server_channels(self, info, server_id, **kwargs):
        return Channel.objects.filter(server=Server.objects.get(id=server_id))

    @login_required
    def resolve_all_messages_by_channel(self, info, channel_id, **kwargs):
        return Message.objects.filter(channel=Channel.objects.get(id=channel_id))


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
        # TODO Check if username already exist
        # if so throw an exception
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

    @login_required
    def mutate(self, info, name, user_adding_right):
        server = Server(name=name, user_adding_right=user_adding_right)
        server.save()

        return CreateServer(
            id=server.id,
            name=server.name,
            user_adding_right=server.user_adding_right,
        )


class CreateMessage(graphene.Mutation):
    text = graphene.String()
    date = graphene.DateTime()
    user = graphene.Field(UserType)
    channel = graphene.Field(ChannelType)
    id = graphene.Int()

    class Arguments:
        text = graphene.String()
        user_id = graphene.Int()
        channel_id = graphene.Int()

    @login_required
    def mutate(self, info, text, user_id, channel_id):
        authUser = info.context.user
        channel = Channel.objects.get(id=channel_id)

        # or channel.user_one != None and channel.user_one != authUser.id and channel.user_two != authUser.id:
        if authUser.id != user_id:
            raise Exception('You are not correctly authentified')

        message = Message(text=text, channel=channel, user=get_user_model()
                          .objects.get(id=user_id))
        message.save()

        return CreateMessage(
            id=message.id,
            text=message.text,
            date=message.date,
            channel=message.channel
        )


class Mutation(graphene.ObjectType):
    create_server = CreateServer.Field()
    create_user = CreateUser.Field()
    create_message = CreateMessage.Field()

