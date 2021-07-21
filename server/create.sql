DROP VIEW IF EXISTS v_defenders, v_goalkeepers, v_forwards, v_midfielders CASCADE;
DROP TABLE IF EXISTS r_goalscore, r_owngoal, r_yellow_card, r_red_card;
DROP TABLE IF EXISTS tb_match;
DROP TABLE IF EXISTS tb_league_table;
DROP TABLE IF EXISTS tb_player_info;


CREATE TABLE IF NOT EXISTS tb_player_info (
	player_id SMALLSERIAL PRIMARY KEY,
	player_name VARCHAR(256) NOT NULL,
	player_nationality VARCHAR(30) NOT NULL,
	player_birthday DATE NOT NULL,
	player_right_foot BOOLEAN NOT NULL,
	player_kit_number INT,
	player_height INT NOT NULL, 
	player_main_position VARCHAR(3)[],
	player_role VARCHAR(20),
	player_salary INT,
	player_status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS tb_league_table (
	team_id SMALLSERIAL PRIMARY KEY,
	team_name VARCHAR(256),
	team_logo_link VARCHAR(256),
	played_game INT DEFAULT 0 NOT NULL,
	win_game INT DEFAULT 0 NOT NULL,
	drawn_game INT DEFAULT 0 NOT NULL,
	lost_game INT DEFAULT 0 NOT NULL,
	goal_for INT DEFAULT 0 NOT NULL,
	goal_against INT DEFAULT 0 NOT NULL,
	goal_difference INT DEFAULT 0 NOT NULL,
	points INT DEFAULT 0 NOT NULL,
	season VARCHAR(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_match (
	match_id SMALLSERIAL PRIMARY KEY,
	enemy_id INT NOT NULL,
	stadium VARCHAR(256) NOT NULL,
	home BOOLEAN NOT NULL,
	home_score INT,
	enemy_score INT,
	matchdate DATE,
	CONSTRAINT fk_enemy  FOREIGN KEY (enemy_id) REFERENCES tb_league_table(team_id) ON DELETE CASCADE
);


CREATE TABLE r_goalscore (
  goalscorer_id	INT REFERENCES tb_player_info (player_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  match_id 		INT REFERENCES tb_match (match_id) ON UPDATE CASCADE,
  minute   		INT NOT NULL,
  pen 			BOOLEAN NOT NULL,
  CONSTRAINT goalscore_pkey PRIMARY KEY (goalscorer_id, match_id, minute)  -- explicit pk
);

CREATE TABLE r_owngoal (
  owngoalscorer_id	INT REFERENCES tb_player_info (player_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  match_id 		INT REFERENCES tb_match (match_id) ON UPDATE CASCADE,
  minute   		INT NOT NULL,
  CONSTRAINT owngoal_pkey PRIMARY KEY (owngoalscorer_id, match_id, minute)  -- explicit pk
);

CREATE TABLE r_yellow_card (
  offender_id	INT REFERENCES tb_player_info (player_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  match_id 		INT REFERENCES tb_match (match_id) ON UPDATE CASCADE,
  minute   		INT NOT NULL,
  CONSTRAINT yellow_card_pkey PRIMARY KEY (offender_id, match_id, minute)  -- explicit pk
);

CREATE TABLE r_red_card (
  offender_id	INT REFERENCES tb_player_info (player_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  match_id 		INT REFERENCES tb_match (match_id) ON UPDATE CASCADE,
  minute   		INT NOT NULL,
  CONSTRAINT red_card_pkey PRIMARY KEY (offender_id, match_id, minute)  -- explicit pk
);

INSERT INTO tb_player_info  (
	player_name, 
	player_nationality, 
	player_birthday, 
	player_right_foot, 
	player_kit_number, 
	player_height, 
	player_main_position,
	player_role, player_salary,
	player_status
)
	VALUES
		('David De Gea', 		'Spain', 		'1990-11-07', TRUE, 	1, 		192, '{"GK"}', 						'Goalkeeper', 	375, 	'first team'),
		('Dean Henderson', 		'Endland', 		'1997-03-12', TRUE, 	26, 	188, '{"GK"}', 						'Goalkeeper', 	100, 	'first team'),
		('Harry Maguire', 		'Endland', 		'1993-03-05', TRUE, 	5, 		194, '{"CB"}', 						'Defender', 	190, 	'first team'),
		('Victor Lindelof', 	'Sweden', 		'1994-07-17', TRUE, 	2, 		187, '{"CB"}', 						'Defender', 	120, 	'first team'),
		('Eric Bailly', 		'Ivory Coast', 	'1994-03-05', TRUE, 	3,  	187, '{"CB"}', 						'Defender', 	80, 	'first team'),
		('Axel Tuanzebe', 		'Congo', 		'1997-11-14', TRUE, 	38, 	186, '{"CB"}', 						'Defender', 	50, 	'first team'),
		('Phil Jones', 			'Endland', 		'1992-02-21', TRUE, 	4,  	185, '{"CB"}', 						'Defender', 	75, 	'first team'),
		('Alex Telles', 		'Brazil', 		'1992-12-15', TRUE, 	27, 	181, '{"LB"}', 						'Defender', 	93, 	'first team'),
		('Luke Shaw', 			'Endland', 		'1995-07-12', FALSE, 	23, 	185, '{"LB"}', 						'Defender', 	150, 	'first team'),
		('Brandon Williams', 	'Endland', 		'2000-09-03', FALSE, 	33, 	172, '{"LB", "RB"}', 				'Defender', 	65, 	'first team'),
		('Aaron Wan-Bissaka', 	'Endland', 		'1997-11-26', TRUE, 	29,  	183, '{"RB"}', 						'Defender', 	90, 	'first team'),
		('Diogo Dalot', 		'Portugal', 	'1999-03-18', TRUE, 	null,  	183, '{"RB", "LB"}', 				'Defender', 	0 , 	'loan'),
		('Nemanja Matic', 		'Serbia', 		'1988-08-01', FALSE, 	31,  	194, '{"CDM"}', 						'Midfielder', 	120, 	'first team'),
		('Paul Pogba', 			'France', 		'1993-03-15', TRUE, 	6,  	191, '{"CDM", "CM", "CAM"}', 		'Midfielder', 	290, 	'first team'),
		('Donny van de Beek', 	'Holland', 		'1997-04-18', TRUE, 	34,  	184, '{"CAM", "LM", "RM", "CM"}', 	'Midfielder', 	120, 	'first team'),
		('Scott McTominay', 	'Scotland', 	'1996-12-08', TRUE, 	39,  	191, '{"CDM", "CM"}', 				'Midfielder', 	20, 	'first team'),
		('Fred', 				'Brazil', 		'1993-03-05', FALSE, 	17,  	169, '{"CDM", "CM"}', 				'Midfielder', 	120, 	'first team'),
		('Bruno Fernandes', 	'Portugal', 	'1994-09-08', TRUE, 	18,  	179, '{"CM", "CAM"}', 				'Midfielder', 	180, 	'first team'),
		('Facundo Pellistri', 	'Uruguay', 		'2001-12-20', TRUE, 	null,  	175, '{"RM", "LM", "CAM", "CM"}', 	'Midfielder', 	0, 		'loan'),
		('Juan Mata', 			'Spain', 		'1988-04-28', FALSE, 	8,  	170, '{"RW", "LW", "CAM", "CM"}', 	'Midfielder', 	160, 	'first team'),
		('Andreas Pereira', 	'Brazil', 		'1996-01-01', TRUE, 	null,  	177, '{"RW", "LW", "CAM"}', 			'Midfielder', 	0, 		'loan'),
		('Jesse Lingard', 		'Spain', 		'1992-12-15', TRUE, 	null,  	175, '{"RW", "LW", "CAM"}', 			'Midfielder', 	0, 		'loan'),
		('Daniel James', 		'Wales', 		'1997-11-10', TRUE, 	21,  	170, '{"RW", "LW"}', 				'Forward', 		45, 	'first team'),
		('Marcus Rashford', 	'Endland', 		'1997-10-31', TRUE, 	10,  	185, '{"RW", "LW", "ST"}', 			'Forward', 		200, 	'first team'),
		('Mason Greenwood', 	'Endland', 		'2001-10-01', FALSE, 	11,  	181, '{"RW", "LW"}', 				'Forward', 		35, 	'first team'),
		('Amad Diallo', 		'Ivory Coast', 	'2002-07-11', FALSE, 	19,  	173, '{"RW", "LW"}', 				'Forward', 		0, 		'non-public'),
		('Anthony Martial', 	'France', 		'1995-12-05', TRUE, 	9,  	181, '{"RW", "LW", "ST"}', 			'Forward', 		250, 	'first team'),
		('Edison Cavani', 		'Uruguay', 		'1987-02-14', TRUE, 	7,  	184, '{"RW", "LW", "ST"}', 			'Forward', 		210, 	'first team');


INSERT INTO tb_league_table (team_name, team_logo_link, season) VALUES 
		('Arsenal', 'https://resources.premierleague.com/premierleague/badges/t3.png', '2122'),
		('Aston Villa', 'https://resources.premierleague.com/premierleague/badges/t7.png', '2122'),
		('Brenford', 'https://resources.premierleague.com/premierleague/badges/t94.png', '2122'),
		('Brighton and Hove Albion', 'https://resources.premierleague.com/premierleague/badges/t36.png', '2122'),
		('Burnley', 'https://resources.premierleague.com/premierleague/badges/t90.png', '2122'),
		('Chelsea', 'https://resources.premierleague.com/premierleague/badges/t8.png', '2122'),
		('Crystal Palace', 'https://resources.premierleague.com/premierleague/badges/t31.png', '2122'),
		('Everton', 'https://resources.premierleague.com/premierleague/badges/t11.png', '2122'),
		('Leeds United', 'https://resources.premierleague.com/premierleague/badges/t2.png', '2122'),
		('Leicester City', 'https://resources.premierleague.com/premierleague/badges/t13.png', '2122'),
		('Liverpool', 'https://resources.premierleague.com/premierleague/badges/t14.png', '2122'),
		('Manchester City', 'https://resources.premierleague.com/premierleague/badges/t43.png', '2122'),
		('Manchester United', 'https://resources.premierleague.com/premierleague/badges/t1.png', '2122'),
		('Newcastle United', 'https://resources.premierleague.com/premierleague/badges/t4.png', '2122'),
		('Norwich City', 'https://resources.premierleague.com/premierleague/badges/t45.png', '2122'),
		('Southamton', 'https://resources.premierleague.com/premierleague/badges/t20.png', '2122'),
		('Tottenham Hotspur', 'https://resources.premierleague.com/premierleague/badges/t6.png', '2122'),
		('Watford', 'https://resources.premierleague.com/premierleague/badges/t57.png', '2122'),
		('West Ham United', 'https://resources.premierleague.com/premierleague/badges/t21.png', '2122'),
		('Wolverhamton Wanderers', 'https://resources.premierleague.com/premierleague/badges/t39.png', '2122');

INSERT INTO tb_match (enemy_id, stadium, home) VALUES 
		(9, 'Old Trafford', TRUE), 
		(16, 'St MARRY', FALSE);

-- create GOALKEEPERS view
CREATE OR REPLACE VIEW v_goalkeepers AS 
	SELECT * FROM tb_player_info where player_role = 'Goalkeeper';
	
-- create DEFENDERS view
CREATE OR REPLACE VIEW v_defenders AS 
	SELECT * FROM tb_player_info where player_role = 'Defender';
	
-- create MIDFIELDERS view
CREATE OR REPLACE VIEW v_midfielders AS 
	SELECT * FROM tb_player_info where player_role = 'Midfielder';
	
-- create FORWARDS view
CREATE OR REPLACE VIEW v_forwards AS 
	SELECT * FROM tb_player_info where player_role = 'Forward';