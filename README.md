#Infant Nutrition Backend api

This repository consists of a set of apis to query info about products, brands etc

## Tech Stack / Pre-requisites

This project is built using nestjs with fastify. The underlying database is mongodb. We have containerised the application using docker. So we just need to have the latest version(>19) of docker in our local.

## Running the application

To start the web-server locally, run

```bash
    yarn docker-start
```

## Notes

- We have chosen fastify as the underlying http server framework as it is very efficient and faster than the default express server 

## Deployment

### MongoDB Schema change
- Import the db provided in forum in your local machine
- 
