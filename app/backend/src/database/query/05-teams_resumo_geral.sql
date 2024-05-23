-- Active: 1713280993944@@127.0.0.1@3306@TRYBE_FUTEBOL_CLUBE
-- teams_resumo_geral.sql
-- SE existe a tabela temporária teams_resumo_geral, ela é excluída.
DROP TEMPORARY TABLE IF EXISTS teams_resumo_geral
CREATE TEMPORARY TABLE teams_resumo_geral AS
SELECT 
    teams_home_resumo.team_name,
    teams_home_resumo.tot_partidas + teams_away_resumo.tot_partidas AS tot_partidas,
    teams_home_resumo.tot_vitoria + teams_away_resumo.tot_vitoria AS tot_vitoria,
    teams_home_resumo.tot_empate + teams_away_resumo.tot_empate AS tot_empate,
    teams_home_resumo.tot_derrota + teams_away_resumo.tot_derrota AS tot_derrota,
    teams_home_resumo.tot_gol_fav + teams_away_resumo.tot_gol_fav AS tot_gol_fav,
    teams_home_resumo.tot_gol_con + teams_away_resumo.tot_gol_con AS tot_gol_con
FROM 
    teams_home_resumo
INNER JOIN 
    teams_away_resumo
ON 
    teams_home_resumo.team_name = teams_away_resumo.team_name

-- Excluir as tabelas temporárias após a união
DROP TEMPORARY TABLE IF EXISTS teams_home_resumo
DROP TEMPORARY TABLE IF EXISTS teams_away_resumo;
