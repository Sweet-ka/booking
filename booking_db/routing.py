from django.urls import path
from .consumers import WSConsumer
from django.urls import re_path

ws_urlpatterns = [
  # path('ws/booking/', WSConsumer.as_asgi()),
  # path('ws/booking/date/', WSConsumer.as_asgi()),
  # re_path(r'ws/booking/date/flat_\d+/$', WSConsumer.as_asgi()),
  re_path(r'ws/booking/date/flat/(?P<flat_id>\d+)/$', WSConsumer.as_asgi()),
]