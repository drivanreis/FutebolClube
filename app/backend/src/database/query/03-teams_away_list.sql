-- Active: 1713280993944@@127.0.0.1@3306@TRYBE_FUTEBOL_CLUBE
-- teams_away_list.sql
-- SE existe a tabela temporária teams_away_list, ela é excluída.
DROP TEMPORARY TABLE IF EXISTS teams_away_list
-- Cria a tabela temporária teams_away_list.
CREATE TEMPORARY TABLE teams_away_list AS
SELECT 
    teams.team_name, 
    matches.away_team_goals AS gol_fav,
    matches.home_team_goals AS gol_con, 
    matches.in_progress, 
    IF(matches.home_team_goals < matches.away_team_goals, 1, 0) AS vitoria, 
    IF(matches.home_team_goals > matches.away_team_goals, 1, 0) AS derrota, 
    IF(matches.home_team_goals = matches.away_team_goals, 1, 0) AS empate
FROM 
    teams 
INNER JOIN 
    matches 
ON 
    teams.id = matches.away_team_id
WHERE 
    matches.in_progress = FALSE;
