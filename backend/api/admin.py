from django.contrib import admin
from .models import Song,Users
# Register your models here.

class SongAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
class UsersAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Song,SongAdmin)
admin.site.register(Users,UsersAdmin)