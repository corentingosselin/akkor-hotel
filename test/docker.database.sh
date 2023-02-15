#!/bin/bash 
# display command examples:
#   ./docker.database.sh stop
#   ./docker.database.sh start

# get input option if stop or start
if [ "$1" = "stop" ]; then
    docker ps -q --filter "name=test-database" | grep -q . && docker stop test-database && docker rm -fv test-database
    exit 0
fi


echo "Removing test-database container if exists"
docker rm --force test-database

# Check if the container was successfully removed
if [ $? -eq 0 ]; then
    echo "Container test-database was successfully removed"
    # Run mysql docker container
    # pull image
    echo "Pulling mysql:latest image"
    docker pull mysql:latest
    # run container
    echo "Running test-database container"
    docker run --name test-database -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=test -p 3305:3306 -d mysql:latest

else
    echo "Failed to remove container test-database"
fi



