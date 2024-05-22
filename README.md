## NOTES
Node version >= 18, MySQL >= 8.0 OR Docker already installed

## I. START PROJECT WITHOUT USING DOCKER
Create .env file from .env.example file, replace with your configuration
```
  cp .env.example .env
```
Install dependencies
```
  yarn
```
Migrate database to create database table
```
  yarn db:migrate
```
Start project
```
  yarn dev
```
Build
```
  yarn build
```
Start production
```
  yarn start
```
## START USING DOCKER
```
  docker compose up
```
Migrate database to create database table
```
  yarn db:migrate
```