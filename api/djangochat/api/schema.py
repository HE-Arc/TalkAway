# djangochat/api/schema.py

from itertools import chain

import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType

from .models import Message, Server, Channel, Right, Reaction, Friend
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


class FriendType(DjangoObjectType):
    class Meta:
        model = Friend


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude_fields = ('password')


class Query(graphene.ObjectType):
    all_messages_by_channel = graphene.List(
        MessageType, channel_id=graphene.Int()
    )

    my_servers = graphene.List(ServerType)
    my_friends = graphene.List(FriendType)

    server_channels = graphene.List(
        ChannelType, server_id=graphene.Int()
    )

    all_users = graphene.List(UserType)

    # viewer = graphene.Field(UserType)
    # @login_required
    # def resolve_viewer(self, info, **kwargs):
    #     return info.context.user

    @login_required
    def resolve_my_friends(self, info, **kwargs):
        return chain(info.context.user.user_one.all(), info.context.user.user_two.all())

    @login_required
    def resolve_my_servers(self, info, **kwargs):
        return info.context.user.servers.all()

    @login_required
    def resolve_server_channels(self, info, server_id, **kwargs):
        return Channel.objects.filter(server=Server.objects.get(id=server_id))

    @login_required
    def resolve_all_messages_by_channel(self, info, channel_id, **kwargs):
        return Message.objects.filter(channel=Channel.objects.get(id=channel_id))

    @login_required
    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all().exclude(username="admin")


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email, image):
        user = get_user_model()(
            username=username,
            email=email
        )
        user.set_password(password)
        user.save()

        return CreateUser(
            user=user,
        )

class CreateServer(graphene.Mutation):
    server = graphene.Field(ServerType)

    class Arguments:
        name = graphene.String()

    @login_required
    def mutate(self, info, name):
        server = Server(name=name, user_adding_right=1)
        server.save()

        right = Right(user=info.context.user, server=server, right=1)
        right.save()

        return CreateServer(
            server = server
        )

class CreateChannel(graphene.Mutation):
    channel = graphene.Field(ChannelType)

    class Arguments:
        name = graphene.String(required=True)
        server_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, server_id, name):
        #TODO: Check right to create a channel

        channel = Channel(name=name, server_id=server_id, direct_type=False)
        channel.save()

        return CreateChannel(
            channel=channel
        )

class EditServer(graphene.Mutation):
    server = graphene.Field(ServerType)

    class Arguments:
        server_id = graphene.Int(required=True)

        name = graphene.String(required=False)
        image = graphene.String(required=False)
        user_adding_right = graphene.Int(required=False)
    
    @login_required
    def mutate(self, info, server_id, **kwargs):
        #TODO: Check rights
        server = Server.objects.get(id=server_id)

        for k, v in kwargs.items():
            setattr(server, k, v)

        server.save()
        return EditServer(server)

class CreateFriend(graphene.Mutation):
    friend = graphene.Field(FriendType)
    channel = graphene.Field(ChannelType)

    class Arguments:
        friend_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, friend_id):
        authUser = info.context.user
        friendUser = get_user_model().objects.get(id=friend_id)

        if Friend.objects.filter(user_one=authUser, user_two=friendUser).exists() or Friend.objects.filter(user_one=friendUser, user_two=authUser).exists():
            raise Exception("Friend relation already exists")

        channel = Channel(
            name=f"{authUser.username}-{friendUser.username}", direct_type=True)

        channel.save()

        friend = Friend(user_one=authUser, user_two=friendUser, chanel=channel)

        friend.save()

        return CreateFriend(
            friend=friend,
            channel=channel
        )


class AddUser(graphene.Mutation):
    right = graphene.Field(RightType)

    class Arguments:
        server_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)
        right = graphene.Int()

    @login_required
    def mutate(self, info, server_id, user_id, right=3):

        authUser = info.context.user

        server = Server.objects.get(id=server_id)

        if right > 3 or right < 1:
            raise Exception(
                "The right value is incorrect, please enter a value between 1 and 3")

        if server not in authUser.servers.all():
            raise Exception("You are not participating to this server")

        if Right.objects.get(user=authUser, server=server).right > 1:
            raise Exception(
                "You don't have the right to add a user to this server")

        user = get_user_model().objects.get(id=user_id)

        if server in user.servers.all():
            raise Exception("This user is already in this server")

        right = Right(right=right, user=user, server=server)

        right.save()

        return AddUser(
            right=right
        )


class CreateMessage(graphene.Mutation):
    text = graphene.String()
    date = graphene.DateTime()
    channel = graphene.Field(ChannelType)
    id = graphene.Int()

    class Arguments:
        text = graphene.String(required=True)
        channel_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, text, channel_id):
        authUser = info.context.user
        channel = Channel.objects.get(id=channel_id)

        if channel.direct_type:
            friend = Friend.objects.get(chanel=channel)

            if friend.user_one != authUser and friend.user_two != authUser:
                raise Exception(
                    "Authentication error, the user isn't a friend with the user he's trying to send a message to")
        else:
            if channel.server not in authUser.servers.all():
                raise Exception(
                    "Authentication error, the user isn't allowed to add a message in this channel")

        message = Message(text=text, channel=channel, user=authUser)
        message.save()

        return CreateMessage(
            id=message.id,
            text=message.text,
            date=message.date,
            channel=message.channel
        )


# https://django-graphql-jwt.domake.io/en/stable/customizing.html
class ObtainJSONWebTokenWithUser(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Mutation(graphene.ObjectType):
    getJWTToken = ObtainJSONWebTokenWithUser.Field()

    add_user = AddUser.Field()
    edit_server = EditServer.Field()
    create_user = CreateUser.Field()
    create_server = CreateServer.Field()
    create_friend = CreateFriend.Field()
    create_message = CreateMessage.Field()
    create_channel = CreateChannel.Field()
