import psycopg2
from django.db import models
from django import forms
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, date
from django.contrib.postgres.forms import SimpleArrayField
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


class MatchResultListForm(forms.Form):
    id = SimpleArrayField(forms.IntegerField(required=True))
    goalscore = SimpleArrayField(forms.IntegerField(required=True))
    goalconceded = SimpleArrayField(forms.IntegerField(required=True))

class BasicPlayerInfo(models.Model):
    name = models.CharField(max_length=50)
    nationality = models.CharField(max_length=20)
    birthday = models.DateField()
    role = models.CharField(max_length=20)
    height = models.IntegerField()
    salary = models.IntegerField(null='non-Public')
    status = models.CharField(max_length=20)

# PLAYER----------------------------------------------------------------------------

def getBasicInfo():
    allRecord = {}
    for position in sp.tableList:
        allRecord[position] = []
        cursorDB.execute("""SELECT * FROM v_%s""" %(position, ))
        tableContent = cursorDB.fetchall()
        for record in tableContent:
            allRecord[position].append(dict(zip(sp.BasicPlayerInfoField, record)))
    return allRecord

def getInfoByPosition(position):
    if position not in sp.tableList:
        return None
    cursorDB.execute("""SELECT * FROM v_%s""" %(position, ))
    tableContent = [] 
    for player in cursorDB.fetchall():    
        tableContent.append(dict(zip(sp.BasicPlayerInfoField, player)))
    return tableContent

def getInfoByID(position, ID):
    cursorDB.execute("""SELECT * FROM get_player_by_id(%s)""" %(ID, ))
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    personalInfo =  dict(zip(sp.personalField, returnRecord[0]))
    return personalInfo

# LEAGUE----------------------------------------------------------------------------

def getLeagueTable():
    leagueTable = []
    cursorDB.execute("""SELECT * from get_all_teams()""")
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        leagueTable.append(dict(zip(sp.leagueTableField, record)))
    return leagueTable

def updateLeagueTable(idList, gsList, gcList, nTeam):
    res = []
    cursorDB.execute("""SELECT * from update_league_table( ARRAY %s, ARRAY %s, ARRAY %s, %s)""" %(idList, gsList, gcList, nTeam))
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        res.append(dict(zip(sp.leagueTableField, record)))
    return res

def clearLeagueTable(idList, gsList, gcList, nTeam):
    res = []
    cursorDB.execute("""SELECT * from clear_league_table()""")
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        res.append(dict(zip(sp.leagueTableField, record)))
    return res

# TEST---------------------------------------------------------------------------------

def test():
    leagueTable = []
    cursorDB.execute("""SELECT * from test()""")
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        leagueTable.append(dict(zip(sp.BasicPlayerInfoField, record)))
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


