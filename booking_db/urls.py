from django.urls import path

from booking_db.views import AddUsersRoom, Dialog, Rooms

urlpatterns = [
  path('room/', Rooms.as_view()),
  path('dialog/', Dialog.as_view()),
  path('users/', AddUsersRoom.as_view())
]