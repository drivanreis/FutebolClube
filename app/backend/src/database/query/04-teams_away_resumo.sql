-- Active: 1713280993944@@127.0.0.1@3306@TRYBE_FUTEBOL_CLUBE
-- teams_away_resumo.sql
-- SE existe a tabela temporária teams_away_resumo, ela é excluída.
DROP TEMPORARY TABLE IF EXISTS teams_away_resumo
-- Cria a tabela temporária teams_away_resumo.
CREATE TEMPORARY TABLE teams_away_resumo AS
SELECT 
    teams_away_list.team_name AS team_name, 
    COUNT(*) AS tot_partidas, 
    SUM(teams_away_list.gol_fav) AS tot_gol_fav, 
    SUM(teams_away_list.gol_con) AS tot_gol_con, 
    SUM(teams_away_list.vitoria) AS tot_vitoria, 
    SUM(teams_away_list.derrota) AS tot_derrota, 
    SUM(teams_away_list.empate) AS tot_empate
FROM 
    teams_away_list
GROUP BY 
    team_name;
-- Exclui a tabela temporária teams_away_list.
DROP TEMPORARY TABLE IF EXISTS teams_away_list;
