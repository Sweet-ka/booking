from channels.generic.websocket import AsyncWebsocketConsumer
from booking_db.models import Dates
from channels.db import database_sync_to_async
import json
from booking_db.serializers import AllDatesSerializer


class WSConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    print('connect')
    self.flat_id = self.scope['url_route']['kwargs']['flat_id']
    self.flat_group_name = "flat_%s" % self.flat_id
    await self.accept()
    await self.channel_layer.group_add(
      self.flat_group_name,
      self.channel_name
    )

  async def disconnect(self, close_code):
    pass

  async def receive(self, text_data):
    flat = json.loads(text_data)["flat"]
    dates = await self.get_dates(flat)
    serializer = AllDatesSerializer(dates, many=True)
    
    await self.channel_layer.group_send(
      self.flat_group_name,{
        'type': 'send_message',
        'message': json.dumps({'dates': serializer.data}),
      })
    
  async def send_message(self, event):
      message = event["message"]
      await self.send(text_data = message)

  @database_sync_to_async
  def get_dates(self, flat):
    return list(Dates.objects.filter(flat_id=flat))
