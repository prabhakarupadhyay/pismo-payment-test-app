#!/bin/sh
docker pull mysql/mysql-server

docker stop mysql
docker rm mysql
docker run --name=mysql -p 3306:3306 -h 0.0.0.0 -d mysql/mysql-server
sleep 10
generatedPasswordString=$(docker logs mysql 2>&1 | grep GENERATED)
#extract password
password="${generatedPasswordString#'[Entrypoint] GENERATED ROOT PASSWORD: '}" 
echo "\n\n YOUR PASSWORD IS: $password\n\n"
