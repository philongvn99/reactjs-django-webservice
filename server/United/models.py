import psycopg2
from django.db import models
from . import forms, support as sp

# Create your models here.


# ===========================INITIAL==========================//
connectionPG = psycopg2.connect(
    user="philong249",
    password="01886933234",
    host="localhost",
    port="5432",
    database="plpostgres_database",
)
cursorDB = connectionPG.cursor()
cursorDB.execute("SELECT version();")
record = cursorDB.fetchone()
# ==============================================================//


# PLAYER----------------------------------------------------------------------------


def getPlayerInfos():
    allRecord = {}
    cursorDB.execute("""SELECT * FROM v_players""")
    tableContent = cursorDB.fetchall()
    for position in sp.tableList:
        allRecord[position] = []
    for record in tableContent:
        allRecord[record[-3].lower()].append(dict(zip(sp.personalField, record)))
    return allRecord


def getInfoByPosition(position):
    if position not in sp.tableList:
        return None
    cursorDB.execute("""SELECT * FROM v_%s""" % (position,))
    tableContent = []
    for player in cursorDB.fetchall():
        tableContent.append(dict(zip(sp.BasicPlayerInfoField, player)))
    return tableContent


def getPlayerInfoByID(position, ID):
    cursorDB.execute("""SELECT * FROM get_player_by_id(%s)""" % (ID,))
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    personalInfo = dict(zip(sp.personalField, returnRecord[0]))
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
    cursorDB.execute(
        """SELECT * from update_league_table( ARRAY %s, ARRAY %s, ARRAY %s, %s)"""
        % (idList, gsList, gcList, nTeam)
    )
    connectionPG.commit()
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        res.append(dict(zip(sp.leagueTableField, record)))
    return res


def clearLeagueTable():
    res = []
    cursorDB.execute("""SELECT * from clear_league_table()""")
    connectionPG.commit()
    returnRecord = cursorDB.fetchall()
    if returnRecord == []:
        return None
    for record in returnRecord:
        res.append(dict(zip(sp.leagueTableFieldRes, record)))
    return res


# USER---------------------------------------------------------------------------------
def submitUserLoginData(userform: forms.UserInfoForm):
    user = userform.data
    cursorDB.execute(
        """SELECT * FROM authenticate_user('%s', '%s')"""
        % (user["username"], user["password"])
    )
    res = cursorDB.fetchall()[0]
    return dict(zip(sp.userField, res)) if res[0] else None


def getUserInfo(username):
    cursorDB.execute("""SELECT * FROM get_user_by_username('%s')""" % (username))
    return dict(zip(sp.userField, cursorDB.fetchall()[0]))


def registerUser(userform: forms.UserInfoForm):
    user = userform.data
    cursorDB.execute(
        """SELECT * FROM register_user('%s', '%s', '%s', '%s', '%s', '%s')"""
        % (
            user["username"],
            user["password"],
            user["email"],
            user["name"],
            user["phone"],
            user["license"],
        )
    )
    return dict(zip(sp.userField, cursorDB.fetchall()[0]))


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
