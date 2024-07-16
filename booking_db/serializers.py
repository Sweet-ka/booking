from rest_framework import serializers
from django.contrib.auth.models import User

from booking_db.models import Chat, Room, Country, Region, Flat, Booking, Dates

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ("id", "username")


class RoomSerializer(serializers.ModelSerializer):
    
  creater = UserSerializer()
  invited = UserSerializer(many=True)

  class Meta:
    model = Room
    fields = ("id", "creater", "invited", "date")


class ChatSerializer(serializers.ModelSerializer):

  user = UserSerializer()

  class Meta:
    model = Chat
    fields = ("user", "text", "date")


class ChatPostSerializer(serializers.ModelSerializer):

  class Meta:
    model = Chat
    fields = ("room", "text")


class CountrySerializer(serializers.ModelSerializer):

  class Meta:
    model = Country
    fields = ("id", "country")


class RegionSerializer(serializers.ModelSerializer):

  country = CountrySerializer()

  class Meta:
    model = Region
    fields = ("id", "country", "region")


class FlatSerializer(serializers.ModelSerializer):

  region = RegionSerializer()
  owner = UserSerializer()

  class Meta:
    model = Flat
    fields = ("id", "name", "region", "address", "owner", "link", "path", "title", "desc", "price", "currency")


class BookingSerializer(serializers.ModelSerializer):

  flat = FlatSerializer()
  tenant = UserSerializer()

  class Meta:
    model = Booking
    fields = ("tenant", "flat", "start_date", "end_date")

class DatesSerializer(serializers.ModelSerializer):

  flat = FlatSerializer()
  tenant = UserSerializer()

  class Meta:
    model = Dates
    fields = ("tenant", "flat", "date")


class AllDatesSerializer(serializers.ModelSerializer):

  class Meta:
    model = Dates
    fields = ("date",)

class OccupiedFlatsSerializer(serializers.ModelSerializer):

  class Meta:
    model = Dates
    fields = ("flat",)