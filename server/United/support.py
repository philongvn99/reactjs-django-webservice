# PLAYER
# Table-name LIST
tableList = ["goalkeeper", "defender", "midfielder", "forward"]

# Player-information FIELDS
#   entire fields
personalField = ['id', 'name', 'full_name', 'avatar_link', 'nationality', 'birthday', 'right_foot', 'kit_number', 'height', 'role', 'salary', 'status']
#   basic fields
BasicPlayerInfoField = ['id', 'name', 'nationality', 'birthday', 'height', 'role', 'salary', 'status']

#  LEAGUE
#  League-table FIELDS
leagueTableField = ['team_id', 'team_name', 'team_acronym_name', 'team_logo_link', 'team_played_game', 'team_won_game', 'team_drawn_game', 'team_lost_game', 'team_goal_for', 'team_goal_against', 'team_goal_difference', 'team_points']
leagueTableFieldRes = ['team_acronym_name', 'team_played_game', 'team_won_game', 'team_drawn_game', 'team_lost_game', 'team_goal_for', 'team_goal_against', 'team_goal_difference', 'team_points']

#  leagueTableField.sort()

username = 'dr3g0ng44m'
passwor = "abc37841"

# Define support function
def displayError(jsError):
    print(jsError)
    for key, values in jsError.items():
        print(key, ':')
        for value in values:
            for field, val in value.items():
                print('  ', field)
                print('     ', val)


char_dict = {   '0' : 0, '1' : 1, '2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, 
                'A' : 10, 'B' : 11, 'C' : 12, 'D' : 13, 'E' : 14, 'F' : 15, 'G' : 16, 'H' : 17, 'I' : 18, 
                'J' : 19, 'K' : 20, 'L' : 21, 'M' : 22, 'N' : 23, 'O' : 24, 'P' : 25, 'Q' : 26, 'R' : 27, 
                'S' : 28, 'T' : 29, 'U' : 30, 'V' : 31, 'W' : 32, 'X' : 33, 'Y' : 34, 'Z' : 35, 
                'a' : 36, 'b' : 37, 'c' : 38, 'd' : 39, 'e' : 40, 'f' : 41, 'g' : 42, 'h' : 43, 'i' : 44, 
                'j' : 45, 'k' : 46, 'l' : 47, 'm' : 48, 'n' : 49, 'o' : 50, 'p' : 51, 'q' : 52, 'r' : 53, 
                's' : 54, 't' : 55, 'u' : 56, 'v' : 57, 'w' : 58, 'x' : 59, 'y' : 60, 'z' : 61  }

userField = ('username', 'email', 'phone', 'name', 'license')


def hex2char(x):
    hex_x = hex(x)[2:]
    return '0' * (2-len(hex_x)) + hex_x 


def encode(x, role):
    
    letter_list = [0] * 5
    
    for i in range(len(x)):
        letter_list[i % 5] += char_dict[x[i]]
        
    raw_id = "".join([hex2char(a) for a in letter_list]).upper()
    
    return raw_id + role
        

