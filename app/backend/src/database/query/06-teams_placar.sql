-- Active: 1713280993944@@127.0.0.1@3306@TRYBE_FUTEBOL_CLUBE
-- teams_placar.sql
-- SE existe a tabela temporária teams_resumo_geral, ela é excluída.
DROP TEMPORARY TABLE IF EXISTS teams_resumo_geral
CREATE TEMPORARY TABLE teams_placar AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY 
        (((tot_vitoria * 3) + tot_empate) / (tot_partidas * 3)) DESC, 
        (tot_gol_fav - tot_gol_con) DESC,
        tot_gol_fav DESC
    ) AS ord_clas,
    team_name,
    (tot_vitoria * 3) + tot_empate AS pontos,
    tot_partidas,
    tot_vitoria,
    tot_empate,
    tot_derrota,
    tot_gol_fav,
    tot_gol_con,
    (tot_gol_fav - tot_gol_con) AS saldo_gol,
    ROUND(((((tot_vitoria * 3) + tot_empate) / (tot_partidas * 3)) * 100), 2) AS aprov
FROM 
    teams_resumo_geral
ORDER BY 
    ord_clas ASC;
DROP TEMPORARY TABLE IF EXISTS teams_resumo_geral;

