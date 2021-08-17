# PLAYER
# Table-name LIST
tableList = ["goalkeepers", "defenders", "midfielders", "forwards"]

# Player-information FIELDS
#   entire fields
personalField = ['id', 'name', 'full_name', 'avatar_link', 'nationality', 'birthday', 'right_foot', 'kit_number', 'height', 'role', 'salary', 'status']
#   basic fields
BasicPlayerInfoField = ['id', 'name', 'nationality', 'birthday', 'height', 'role', 'salary', 'status']
basicStr = 'player_id, player_name, player_nationality, player_birthday, player_height, player_role, player_salary, player_status'

#  LEAGUE
#  League-table FIELDS
leagueTableField = ['team_id', 'team_name', 'team_acronym_name', 'team_logo_link', 'team_played_game', 'team_won_game', 'team_drawn_game', 'team_lost_game', 'team_goal_for', 'team_goal_against', 'team_goal_difference', 'team_points', 'season']

# Define support function
def displayError(jsError):
    print(jsError)
    for key, values in jsError.items():
        print(key, ':')
        for value in values:
            for field, val in value.items():
                print('  ', field)
                print('     ', val)