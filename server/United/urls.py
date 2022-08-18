from django.urls import path, include
from . import views


urlpatterns = [
    path("player/", views.AllPlayerInfo, name="Home Page"),
    path("player/<str:position>/", views.PlayerInfoByPosition, name="Info By Position"),
    path("player/<str:position>/<int:ID>/", views.PlayerInfoByID, name="Info By ID"),
    path("league/table/", views.LeagueTable, name="Info By ID"),
    path("user/login/", views.UserLogin, name="Log In"),
    path("user/signup/", views.UserRegister, name="Sign Up"),
    path("user/<str:username>", views.UserInfo, name="User Info by Username"),
    path("test/", views.test, name="Info By ID"),
    path(r"api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
