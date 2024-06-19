from django.contrib import admin
from booking_db.models import Room, Chat

# Register your models here.

class RoomAdmin(admin.ModelAdmin):
  list_display = ("creater", "invited_user", "date")

  def invited_user(self, obj):
    print(obj)
    return "\n".join([user.username for user in obj.invited.all()])
  

class ChatAdmin(admin.ModelAdmin):
  list_display = ("room", "user", "text", "date")


admin.site.register(Room, RoomAdmin)
admin.site.register(Chat, ChatAdmin)