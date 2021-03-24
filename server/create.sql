DROP TABLE IF EXISTS player_info;
CREATE TABLE IF NOT EXISTS player_info (
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

INSERT INTO player_info  (
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

-- create GOALKEEPERS view
CREATE OR REPLACE VIEW goalkeepers AS 
	SELECT * FROM player_info where player_role = 'Goalkeeper';
	
-- create DEFENDERS view
CREATE OR REPLACE VIEW defenders AS 
	SELECT * FROM player_info where player_role = 'Defender';
	
-- create MIDFIELDERS view
CREATE OR REPLACE VIEW midfielders AS 
	SELECT * FROM player_info where player_role = 'Midfielder';
	
-- create FORWARDS view
CREATE OR REPLACE VIEW forwards AS 
	SELECT * FROM player_info where player_role = 'Forward';