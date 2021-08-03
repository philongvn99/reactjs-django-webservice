from rest_framework import serializers

from .models import BasicPlayerInfo

class CarSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BasicPlayerInfo
        fields = ('name', 'nationality', 'birthday', 'role', 'height', 'salary', 'status')