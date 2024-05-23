-- Active: 1713280993944@@127.0.0.1@3306@TRYBE_FUTEBOL_CLUBE
-- teams_home_resumo.sql
-- SE existe a tabela temporária teams_home_resumo, ela é excluída.
DROP TEMPORARY TABLE IF EXISTS teams_home_resumo
-- Cria a tabela temporária teams_home_resumo.
CREATE TEMPORARY TABLE teams_home_resumo AS
SELECT 
    teams_home_list.team_name AS team_name, 
    COUNT(*) AS tot_partidas, 
    SUM(teams_home_list.gol_fav) AS tot_gol_fav, 
    SUM(teams_home_list.gol_con) AS tot_gol_con, 
    SUM(teams_home_list.vitoria) AS tot_vitoria, 
    SUM(teams_home_list.derrota) AS tot_derrota, 
    SUM(teams_home_list.empate) AS tot_empate
FROM 
    teams_home_list
GROUP BY 
    team_name;
-- Exclui a tabela temporária teams_home_list.
DROP TEMPORARY TABLE IF EXISTS teams_home_list;