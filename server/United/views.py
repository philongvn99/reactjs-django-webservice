from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json, jwt, time
from . import models, forms, support as sp

# from United.serializers import PlayerSerializer

# Create your views here.


# ALL PLAYER INFOs          ===============================================================
def verifyJWT(headers):
    if "Authorization" not in headers:
        return Response(
            'Lack of JSON Web Token -  "Authorizcation" field',
            status=status.HTTP_400_BAD_REQUEST,
        )
    jwToken = headers["Authorization"]
    alg = headers["alg"] if "alg" in headers else "HS256"
    payload = jwt.decode(
        jwToken,
        key=settings.SECRET_KEY,
        algorithms=[
            alg,
        ],
    )
    curr = int(time.time())
    print(f"now: {payload['expire_time']} - exp: {curr}")
    return payload["expire_time"] < curr


@api_view(["GET", "POST"])
def AllPlayerInfo(request):
    if request.method == "GET":
        players = models.getPlayerInfos()
        return Response(players, status=status.HTTP_200_OK)
    elif request.method == "POST":
        print(request, request.data.json())
        inputD = models.inputJSON(request.data.json())
        if request.data["method"] == "Create":
            return Response("Create Table Success", status=status.HTTP_201_CREATED)
        else:
            return Response("NORMAL", status=status.HTTP_200_OK)


# PLAYER INFOs BY POSITION  ===============================================================


@api_view(["GET", "POST"])
def PlayerInfoByPosition(request, position):
    if request.method == "GET":
        _infoByPosition = models.getInfoByPosition(position)
        return Response(_infoByPosition, status=status.HTTP_200_OK)


# PLAYER INFO BY ID         ===============================================================


@api_view(["GET", "POST"])
def PlayerInfoByID(request, position, ID):
    if request.method == "GET":
        _infoByID = models.getPlayerInfoByID(position, ID)
        if _infoByID == None:
            return Response("No Player Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_infoByID, status=status.HTTP_200_OK)


# EPL TEAM INFO             ===============================================================


@api_view(["GET", "POST", "PUT", "DELETE"])
def LeagueTable(request):

    # POST
    if request.method == "POST":
        return Response({"status": "Have not been defined"}, status=status.HTTP_200_OK)

    # GET
    if request.method == "GET":
        _leagueTable = models.getLeagueTable()
        if _leagueTable == None:
            return Response(
                "NO EPL League Table Found", status=status.HTTP_204_NO_CONTENT
            )
        return Response(_leagueTable, status=status.HTTP_200_OK)

    # UPDATE
    elif request.method == "PUT":
        matchResuls = forms.MatchResultListForm(request.data)  # Validating INPUT

        # Invalid Input
        if not matchResuls.is_valid():
            jsonStr = json.loads(matchResuls.errors.as_json())
            sp.displayError(jsonStr)
            return Response(
                {"success": False, "data": jsonStr},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        # Valid Input
        else:
            response = models.updateLeagueTable(
                request.data["id"],
                request.data["goalscore"],
                request.data["goalconceded"],
                len(request.data["id"]),
            )
            return Response(
                {"success": True, "data": response}, status=status.HTTP_200_OK
            )

    # DELETE
    elif request.method == "DELETE":
        response = models.clearLeagueTable()
        return Response(response, status=status.HTTP_200_OK)


# USER LOGIN / SIGNUP / MODIFY  ===============================================================
@api_view(["GET", "POST"])
def UserLogin(request):
    if request.method == "GET":
        x = forms.PlayerInfoForm(
            {"salary": 0} | {"name": "haha", "number": 1, "status": "A"}
        )
        print(x.data)
        for err in json.loads(x.errors.as_json()).items():
            print(err)
        return Response({"status": "OKE"}, status=status.HTTP_200_OK)

    if request.method == "POST":
        userLoginInfo = forms.LoginInfoForm(request.data)
        # Imvalid Input
        if not userLoginInfo.is_valid():
            jsonStr = json.loads(userLoginInfo.errors.as_json())
            sp.displayError(jsonStr)
            return Response(
                {"success": False, "data": jsonStr},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        # Valid Input
        else:
            response = models.submitUserLoginData(userLoginInfo)
            if response != None:
                secret_key = settings.SECRET_KEY

                refresh_token_content = {
                    "username": response["username"],
                    "password": response["email"],
                    "phone": response["phone"],
                }

                ts = int(time.time())

                access_token_content = {
                    "username": response["username"],
                    "email": response["email"],
                    "phone": response["phone"],
                    "iss": ts,
                    "exp": ts + 60,
                }

                final_payload_x = {
                    "user_session": {
                        **response,
                        # "iss": ts,
                        # "exp": ts + 60,
                    },
                    "auth_token": {
                        "access": jwt.encode(access_token_content, secret_key),
                        "refresh": jwt.encode(refresh_token_content, secret_key),
                    },
                }

                return Response(
                    final_payload_x,
                    status=status.HTTP_200_OK,
                    content_type="application/json",
                )

            else:
                print(2)
                print(userLoginInfo)

                return Response(
                    {"message": "Username/Email or Password is Invalid"},
                    status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
                )


@api_view(["POST"])
def UserRegister(request):
    if request.method == "POST":
        userResInfo = forms.UserInfoForm(request.data)

        # Imvalid Input
        if not userResInfo.is_valid():
            jsonStr = json.loads(userResInfo.errors.as_json())
            sp.displayError(jsonStr)
            return Response(
                {"success": False, "data": jsonStr},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        # Valid Input
        else:
            response = models.submitUserLoginData(userResInfo.data)
            print(response)
            return Response(
                {"success": response["username"] != None, "userInfo": response},
                status=status.HTTP_200_OK
                if response != []
                else status.HTTP_409_CONFLICT,
            )


@api_view(["GET", "PUT"])
def UserInfo(request, username):

    # GET User Information
    if request.method == "GET":
        print(verifyJWT(request.headers))
        response = models.getUserInfo(username)
        if response["username"] != None:
            return Response(
                {"success": True, "userInfo": response}, status=status.HTTP_200_OK
            )
        else:
            return Response({"success": False}, status=status.HTTP_204_NO_CONTENT)

    # UPDATE User Information
    elif request.method == "PUT":
        response = models.modifyUserInfo(request.data)
        print(response)


@api_view(["GET", "POST"])
def test(request):
    if request.method == "GET":
        _infoByID = models.test()
        if _infoByID == None:
            return Response("No Player Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_infoByID, status=status.HTTP_200_OK)
