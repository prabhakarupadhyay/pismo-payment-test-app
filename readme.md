# **Pismo Test Payment App**

Pismo Test Payment application. This App has 2 endpoints: `/accounts` and `/transactions`. 

The *accounts* endpoint has `get` method to get account info based on account id and `post` method to create new account. 

The *tansactions* endpoint has `get` method to get top 10 transactions ordered by date and `post` method to create new transaction.

## Pre Configuration

- Unix/Linux based operating system.
- Docker service installed and running in the system. Click [here](https://www.docker.com) to install docker.
- Nodejs installed in the system. Click [here](https://nodejs.org/en/) to install nodejs(latest)

## Pre Installation

Run the below command in the root directory of the terminal and copy the **Generated password**
```bash
$ sh mysql.sh
```
The shell script 
- Pulls the mysql server docker image
- Runs the container with the name `mysql` on port `3306`
- Generates a temporary password

Follow Below commands to configure mysql server on successfull generation of password

```bash
#enter temporary password when prompted
$ docker exec -it mysql mysql -uroot -p
```
Copy paste below commands in mysql cli

```bash
#Default password is 'password' which is also preconfigured in config.json file
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

#Allow all hosts to connect to mysql server
mysql> UPDATE mysql.user SET host='%' WHERE user='root';

mysql> flush privileges;

#Default database is test also preconfigured in config.json file
mysql> CREATE DATABASE test; 

mysql> exit
```

## Install modules and run Server

```bash
$ npm install

$ npm start
```
Server Running on `localhost:8000`

## API and Endpoints

`POST /accounts`
```json
Request Body:
{
"document_number": "12345678900"
}
```


`GET /accounts/:accountId`
```json
Response Body:
{
"account_id": 1,
"document_number": "12345678900"
}
```
`GET /transactions`: Get top 10 transactions

`POST /transactions`

```
valid operation_type_id values: 1,2,3,4
```

```json
Request Body:
{
"account_id": 1,
"operation_type_id": 4,
"amount": 123.45
}
```

`GET /api-docs` : Access swagger doc UI

## Pismo Functional Tests

> To execute all unit test cases use `npm test` command

> To execute specific unit test case, modify the `package.json` file ( replace "test": "./node_modules/.bin/mocha "tests/modules/*.js" --timeout 0 --recursive --reporter spec --sort" with "test": "./node_modules/.bin/mocha "tests/modules/`<FILE_NAME>`.js" --timeout 0 --recursive --reporter spec --sort") then use `npm test` command

> To execute converage report use `npm run coverage` command

## Author
PrabhakarUpadhyay


