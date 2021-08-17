from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import models, support as sp
from flask import Flask, jsonify



# Create your views here.



# ALL PLAYER INFOs

@api_view(['GET', 'POST'])
def BasicInfo(request):
    if request.method == 'GET':
        allTable = models.getBasicInfo()
        return Response(allTable, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        print(request, request.data.json())
        inputD = models.inputJSON(request.data.json())
        # print(inputD)
        # if(~inputD.is_valid()):
        #     jsonStr = json.loads(inputD.errors.as_json())
        #     print(jsonStr)
        #     for key, values in jsonStr.items():
        #         print(key, ':')
        #         for value in values:
        #             for field, val in value.items():
        #                 print('  ', field)
        #                 print('     ', val)
        #     return Response(jsonStr, status=status.HTTP_201_CREATED)
        if request.data['method'] == 'Create':
            return Response('Create Table Success', status=status.HTTP_201_CREATED)
        else:
            return Response('NORMAL', status=status.HTTP_200_OK)



# PLAYER INFOs BY POSITION

@api_view(['GET', 'POST'])
def InfoByPosition(request, position):
    if request.method == 'GET':
        _infoByPosition = models.getInfoByPosition(position)
        return Response(_infoByPosition, status=status.HTTP_200_OK)



# PLAYER INFO BY ID

@api_view(['GET', 'POST'])
def InfoByID(request, position, ID):
    if request.method == 'GET':
        _infoByID = models.getInfoByID(position, ID)
        if _infoByID == None:
            return Response("No Player Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_infoByID, status=status.HTTP_200_OK)


# EPL TEAM INFO

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def LeagueTable(request):

    # POST
    if request.method == 'POST':
        return Response({status: 'Have not been defined'}, status=status.HTTP_200_OK)


    # GET
    if request.method == 'GET':
        _leagueTable = models.getLeagueTable()
        if _leagueTable == None:
            return Response("EPL League Table Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_leagueTable, status=status.HTTP_200_OK)

    # UPDATE
    elif request.method == 'PUT':
        matchResuls = models.MatchResultListForm(request.data)        # Validating INPUT

        # Invalid Input
        if(not matchResuls.is_valid() ):
            jsonStr = json.loads(matchResuls.errors.as_json())
            sp.display(jsonStr)
            return Response(jsonStr, status=status.HTTP_406_NOT_ACCEPTABLE)

        # Valid Input
        else:
            response = models.updateLeagueTable(request.data['id'], request.data['goalscore'], request.data['goalconceded'], len(request.data['id']))
            return Response(response, status=status.HTTP_200_OK)

    # DELETE
    elif request.method == 'DELETE':
        response = models.clearLeagueTable()
        return Response(response, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def test(request):
    if request.method == 'GET':
        _infoByID = models.test()
        if _infoByID == None:
            return Response("No Player Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_infoByID, status=status.HTTP_200_OK)