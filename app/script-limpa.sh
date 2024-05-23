# Pega todos os containers
CONTAINERS=$(docker ps -aq)

# Para todos os container
if [ -n "$CONTAINERS" ]; then
    docker stop $CONTAINERS
fi

# Excluir todos os container
if [ -n "$CONTAINERS" ]; then
    docker rm -f $CONTAINERS
fi

# Pega todas as images
IMAGES=$(docker images -aq)

# Excluir todas as images
if [ -n "$IMAGES" ]; then
    docker rmi $IMAGES
fi

# Pega as Redes
# NETWORKS=$(docker network ls -q)

# Excluir a Rede
# if [ -n "$NETWORKS" ]; then
#     docker network rm $NETWORKS
# fi

# Para o Daemon
# service docker stop

# Excluir as portas do node
# killall -9 node

# Verifique se nenhuma porta está em uso
# netstat -an | egrep ":(3001|3306|33060)"

# Remover referências ao contêiner do Cache:
docker system prune -af

# Caso as images não tenhão sido excluidas
# Ou tenha duas images com o mesmo Id, use isso:
systemctl restart docker

# Iniciar daemon: 
# service docker start

# Criar rede:
# docker network create

# Caso as images não tenhão sido excluidas,
# Reinstale o DOCKER

clear
docker images
docker ps -a
docker-compose up -d --build
