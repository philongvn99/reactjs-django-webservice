from django.urls import path, include
from . import views


urlpatterns = [
    path('player/', views.BasicInfo, name='Home Page'),
    path('player/<str:position>/', views.InfoByPosition, name='Info By Position'),
    path('player/<str:position>/<int:ID>/', views.InfoByID, name='Info By ID'),
    path('league/table/', views.LeagueTable, name='Info By ID'),
    path('test/', views.test, name='Info By ID'),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]