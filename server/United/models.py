import psycopg2
from django.db import models
from django import forms
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, date
from . import support as sp
# Create your models here.


#===========================INITIAL==========================//
connectionPG = psycopg2.connect(user = "postgres",
                                    password = "01886933234",
                                    host = "127.0.0.1",
                                    port = "5432",
                                    database = "postgres")
cursorDB = connectionPG.cursor()
print ( connectionPG.get_dsn_parameters(),"\n")
cursorDB.execute("SELECT version();")
record = cursorDB.fetchone()
print("You are connected to - ", record,"\n")
#==============================================================//

class inputJSON(forms.Form):
    method = forms.CharField(required=True, max_length=100)
    dataip = forms.CharField(required=True, max_length=4)

class BasicPlayerInfo(models.Model):
    name = models.CharField(max_length=50)
    nationality = models.CharField(max_length=20)
    birthday = models.DateField()
    role = models.CharField(max_length=20)
    height = models.IntegerField()
    salary = models.IntegerField(null='non-Public')
    status = models.CharField(max_length=20)

def getBasicInfo():
    allRecord = {}
    for position in sp.tableList:
        allRecord[position] = []
        cursorDB.execute("""SELECT %s FROM %s""" %(sp.basicStr , 'v_' + position, ))
        tableContent = cursorDB.fetchall()
        for record in tableContent:
            allRecord[position].append(dict(zip(sp.BasicPlayerInfoField, record)))
    return allRecord

def getInfoByPosition(position):
    if position not in sp.tableList:
        return None
    cursorDB.execute("""SELECT %s FROM %s""" %(sp.basicStr , 'v_' + position, ))
    tableContent = [] 
    for player in cursorDB.fetchall():    
        tableContent.append(dict(zip(sp.BasicPlayerInfoField, player)))
    return tableContent

def getInfoByID(position, ID):
    cursorDB.execute("""SELECT * FROM %s WHERE id = %s""" %('v_'+ position, ID))
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    personalInfo =  dict(zip(sp.personalField, returnRecord[0]))
    return personalInfo

def getLeagueTable():
    leagueTable = []
    cursorDB.execute("""SELECT * FROM tb_league_table order by points DESC, goal_difference DESC, goal_for DESC, goal_against ASC, team_name ASC""")
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        leagueTable.append(dict(zip(sp.leagueTableField, record)))
    return leagueTable



# def createDatabase():
#     cursorDB.execute("""DROP SCHEMA public CASCADE;
#                         CREATE SCHEMA public;""")
#     for tablename in sp.tableList:
#         cursorDB.execute(sp.crtTableStr + sp.tablename+ sp.creationCommand)
#         for personalInfo in sp.infoFootballer[tablename]:
#             cursorDB.execute("INSERT INTO %s %s VALUES %s" %(tablename, sp.fieldInserted, personalInfo, ))
#     connectionPG.commit()
#     print("Table created successfully in PostgreSQL ")


