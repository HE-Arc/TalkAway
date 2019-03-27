
from channels.routing import ProtocolTypeRouter, URLRouter
import api.routing
from api.token_auth import TokenAuthMiddlewareStack

ASGI_APPLICATION = "api.routing.application"

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            api.routing.websocket_urlpatterns
        )
    ),
})