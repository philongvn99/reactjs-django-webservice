from rest_framework import serializers
from .models import BasicPlayerInfo

class PlayerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BasicPlayerInfo
        fields = ['name', 'nationality', 'birthday', 'role', 'height', 'salary', 'status']