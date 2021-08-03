from django.contrib import admin
from .models import BasicPlayerInfo

# Register your models here.
class BasicPlayerInfoAdmin(admin.ModelAdmin):
    list_display=['name', 'nationality', 'birthday', 'role', 'height', 'salary', 'status']

admin.site.register(BasicPlayerInfo, BasicPlayerInfoAdmin)