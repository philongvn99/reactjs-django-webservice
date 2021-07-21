from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import models
from flask import Flask, jsonify

# Create your views here.

@api_view(['GET', 'POST'])
def Info(request):
    if request.method == 'GET':
        allTable = models.getAllInfo()
        return Response(allTable, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        inputD = models.inputJSON(request.data)
        print(inputD)
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



@api_view(['GET', 'POST'])
def InfoByPosition(request, position):
    if request.method == 'GET':
        _infoByPosition = models.getInfoByPosition(position)
        return Response(_infoByPosition, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def InfoByID(request, position, ID):
    if request.method == 'GET':
        _infoByID = models.getInfoByID(position, ID)
        if _infoByID == None:
            return Response("No Player Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_infoByID, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def LeagueTable(request):
    if request.method == 'GET':
        _leagueTable = models.getLeagueTable()
        if _leagueTable == None:
            return Response("EPL League Table Found", status=status.HTTP_204_NO_CONTENT)
        return Response(_leagueTable, status=status.HTTP_200_OK)