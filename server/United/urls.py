from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.homePage, name='Home Page'),
    path(r'<str:position>/', views.InfoByPosition, name='Info By Position'),
    path(r'<str:position>/<int:ID>', views.InfoByID, name='Info By ID'),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]