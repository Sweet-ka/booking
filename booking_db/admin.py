from django.contrib import admin
from booking_db.models import Room, Chat, Country, Region, Flat, Booking
from django.contrib.auth.models import User

# Register your models here.

class RoomAdmin(admin.ModelAdmin):
  list_display = ("creater", "invited_user", "date")

  def invited_user(self, obj):
    return "\n".join([user.username for user in obj.invited.all()])
  
admin.site.register(Room, RoomAdmin)


class ChatAdmin(admin.ModelAdmin):
  list_display = ("room", "user", "text", "date")

admin.site.register(Chat, ChatAdmin)


class RegionInline(admin.TabularInline):
    model = Region
    extra = 0

class CountryAdmin(admin.ModelAdmin):
  list_display = ("country",)
  inlines = [
    RegionInline,
  ]

admin.site.register(Country, CountryAdmin)


class RegionAdmin(admin.ModelAdmin):
  list_display = ("country_name", "region")

  def country_name(self, obj):
    return obj.country.country

admin.site.register(Region, RegionAdmin)


class FlatAdmin(admin.ModelAdmin):
  list_display = ("name", "region", "address", "owner", "link", "path", "title", "desc")

admin.site.register(Flat, FlatAdmin)


# class TenantInline(admin.TabularInline):
#     model = User
#     extra = 0

class BookingAdmin(admin.ModelAdmin):
  list_display = ("flat", "start_date", "end_date", "tenant")
  # inlines = [
  #   TenantInline,
  # ]

admin.site.register(Booking, BookingAdmin)
# class Inline(admin.TabularInline):
#     model = Region
#     extra = 0

# class BookingAdmin(admin.ModelAdmin):
#   list_display = ["flat", "tenant", "date"]