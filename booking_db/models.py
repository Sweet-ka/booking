from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Room(models.Model):
  creater = models.ForeignKey(User, verbose_name="Владелец", on_delete=models.CASCADE)
  invited = models.ManyToManyField(User, verbose_name="Участники", related_name="invited_user")
  date = models.DateTimeField("Дата создания", auto_now_add=True)

  class Meta:
    verbose_name = "Комната чата"
    verbose_name_plural = "Комнаты чатов"


class Chat(models.Model):
  room = models.ForeignKey(Room, verbose_name="Комната чата", on_delete=models.CASCADE)
  user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)
  text = models.TextField("Сообщение", max_length=500)
  date = models.DateTimeField("Дата отправки", auto_now_add=True)

  class Meta:
    verbose_name = "Сообщение чата"
    verbose_name_plural = "Сообщения чатов"


class Country(models.Model):
  country = models.CharField("Страна", max_length=100)

  class Meta:
    verbose_name = "Страна"
    verbose_name_plural = "Страны"

  def __str__(self):
    return self.country



class Region(models.Model):
  country = models.ForeignKey(Country, verbose_name = "Страна", default="1", on_delete=models.CASCADE)
  region = models.CharField(max_length=100)

  class Meta:
    verbose_name = "Регион"
    verbose_name_plural = "Регионы"

  def __str__(self):
    return f"{self.country}, {self.region}"


class Flat(models.Model):
  # country = models.ForeignKey(Country, verbose_name = "Страна", default="1", on_delete=models.CASCADE)
  name = models.CharField("Название", max_length=255, default="Описание", null=True)
  region = models.ForeignKey(Region, verbose_name = "Регион", default="1", on_delete=models.CASCADE)
  address = models.CharField("Адрес", max_length=255)
  link = models.CharField("На карте", max_length=255, null=True)
  owner = models.ForeignKey(User, verbose_name="Хозяин", on_delete=models.CASCADE)
  path = models.CharField("Фото", max_length=255, null=True)
  title = models.CharField("Слоган", max_length=255, null=True)
  desc = models.TextField("Описание", null=True)

  class Meta:
    verbose_name = "Квартира"
    verbose_name_plural = "Квартиры"

  def __str__(self):
    return self.name


class Booking(models.Model):
  flat = models.ForeignKey(Flat, verbose_name = "Квартира", on_delete=models.CASCADE)
  start_date = models.DateField("Дата заселения", null=True)
  end_date = models.DateField("Дата выселения", null=True)
  tenant = models.ForeignKey(User, verbose_name="Арендатор", on_delete=models.CASCADE)
  class Meta:
    unique_together = ('tenant', 'start_date', 'end_date')

class Dates(models.Model):
  flat = models.ForeignKey(Flat, verbose_name = "Квартира", on_delete=models.CASCADE)
  date = models.DateField("Забронорованная дата", null=True)
  tenant = models.ForeignKey(User, verbose_name="Арендатор", on_delete=models.CASCADE)
  class Meta:
    unique_together = ('flat', 'date')
