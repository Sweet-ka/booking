from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User
from django.db.models import Q
from itertools import chain
from datetime import date
from django.utils.dateparse import parse_date

# Create your views here.

from django.http import HttpResponse

from booking_db.models import Chat, Room, Booking, Dates, Flat, Region
from booking_db.serializers import (ChatPostSerializer, ChatSerializer, RoomSerializer, UserSerializer, BookingSerializer,
                                     DatesSerializer, AllDatesSerializer, OccupiedFlatsSerializer, FlatSerializer, RegionSerializer)
  
def index(request):
    return HttpResponse("Hello BOOKING!")
    

class Rooms(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # rooms = Room.objects.filter(Q(creater=request.user) | Q(invited=request.user))
        roomsCreater = Room.objects.filter(creater=request.user)
        roomsInvited = Room.objects.filter(invited=request.user)
        rooms = list(chain(roomsCreater, roomsInvited))
        serializer = RoomSerializer(rooms, many=True)
        return Response({"data": serializer.data})
    
    def post(self, request):
        Room.objects.create(creater=request.user)
        return Response(status=201)
    

class Dialog(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    def get(self, request):
        room = request.GET.get("room")
        chat = Chat.objects.filter(room = room)
        serializer = ChatSerializer(chat, many=True)
        return Response({"data": serializer.data})
    
    def post(self, request):
        # room = request.data.get("room")
        dialog = ChatPostSerializer(data = request.data)
        if dialog.is_valid():
            dialog.save(user = request.user)
            return Response({"status": "Add"})
        else:
            return Response({"status": "Error"})

class AddUsersRoom(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.filter(~Q(id=request.user.id))
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        room = request.data.get('room')
        user = request.data.get('user')
        try:
            room = Room.objects.get(id=room)
            room.invited.add(user)
            room.save()
            return Response(status=201)
        except:
            return Response(status=400)


class BookingDates(APIView):
    permission_classes = [permissions.AllowAny]
    # получить занятые даты определенной квартиры
    def get(self, request):
        flat = request.GET.get('flat')
        dates = Dates.objects.filter(flat_id=flat)
        serializer = AllDatesSerializer(dates, many=True)
        return Response({"flat": flat, "dates": serializer.data})


class AddBooking(APIView):
    permission_classes = [permissions.AllowAny]
    # пролучить занятые квартиры в указанном периоде
    def get(self, request):
        start_date = parse_date(request.GET.get('start_date'))
        end_date = parse_date(request.GET.get('end_date'))
        dates = Dates.objects.filter(date__range=(start_date, end_date))
        serializer = OccupiedFlatsSerializer(dates, many=True)
        return Response({"flats": serializer.data})

    def post(self, request):
        flat = request.data.get('flat')
        dates = request.data.get("dates")
        print(dates)
        tenant = request.user.id
        # start_date = parse_date(request.data.get('start_date'))
        for date in dates.split(","):
            print(date)
            Dates.objects.create(flat_id=flat, tenant_id=tenant, date=date)
        # end_date = parse_date(request.data.get('end_date'))
        # serializer = BookingSerializer(flat, tenant, start_date, end_date)
        try:
            # dates = Dates.objects.filter(date__range=(date(start_date), date(end_date)))
            # booking = Booking.objects.all()
            # booking.add(serializer.data)
            return Response({"status":"add"})
        except:
            return Response(status=400)

class GetFlats(APIView):
    permission_classes = [permissions.AllowAny]
    # пролучить все квартиры в регионе
    def get(self, request):
        if request.GET.get('region'):
          flats = Flat.objects.filter(region=request.GET.get('region'))
        else:
          flats = Flat.objects.all()
        serializer = FlatSerializer(flats, many=True)
        return Response({"flats": serializer.data})

class GetRegions(APIView):
    permission_classes = [permissions.AllowAny]
    # пролучить все регионы
    def get(self, request):
        flats = Region.objects.all()
        serializer = RegionSerializer(flats, many=True)
        return Response({"regions": serializer.data})
