from django.urls import path

from booking_db.views import AddUsersRoom, Dialog, Rooms, AddBooking, BookingDates, GetFlats, GetRegions

urlpatterns = [
  path('room/', Rooms.as_view()),
  path('dialog/', Dialog.as_view()),
  path('users/', AddUsersRoom.as_view()),
  path('date/', BookingDates.as_view()),
  path('range/', AddBooking.as_view()),
  path('flats/', GetFlats.as_view()),
  path('regions/', GetRegions.as_view()),
]