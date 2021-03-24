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

def getAllInfo():
    allRecord = {}
    for tablename in sp.tableList:
        allRecord[tablename] = []
        cursorDB.execute("""SELECT * FROM %s""" %(tablename, ))
        tableContent = cursorDB.fetchall()
        for record in tableContent:
            allRecord[tablename].append(dict(zip(sp.personalField, record)))
    return allRecord

def getInfoByPosition(position):
    if position not in sp.tableList:
        print(position, sp.tableList)
        return None
    cursorDB.execute("""SELECT * FROM %s""" %(position, ))
    tableContent = [] 
    for player in cursorDB.fetchall():    
        tableContent.append(dict(zip(sp.personalField, player)))
    return tableContent

def getInfoByID(position, ID):
    cursorDB.execute("""SELECT * FROM %s WHERE id = %s""" %(position, ID))
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    personalInfo =  dict(zip(sp.personalField, returnRecord[0]))
    return personalInfo


# def createDatabase():
#     cursorDB.execute("""DROP SCHEMA public CASCADE;
#                         CREATE SCHEMA public;""")
#     for tablename in sp.tableList:
#         cursorDB.execute(sp.crtTableStr + sp.tablename+ sp.creationCommand)
#         for personalInfo in sp.infoFootballer[tablename]:
#             cursorDB.execute("INSERT INTO %s %s VALUES %s" %(tablename, sp.fieldInserted, personalInfo, ))
#     connectionPG.commit()
#     print("Table created successfully in PostgreSQL ")


