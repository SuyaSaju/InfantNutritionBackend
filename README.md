#Infant Nutrition Backend api

This repository consists of a set of apis to query info about products, brands etc

## Tech Stack / Pre-requisites

This project is built using nestjs with fastify. The underlying database is mongodb and we have used typeORM to fetch this data. We have containerised the application using docker. So we just need to have the latest version(>19) of docker in our local.

## Running the application

To start the web-server locally, run

```bash
    yarn docker-start
```

## Verification Document

To verify that all the apis are working as expected, you can refer to the postman collection. There are 11 request in this collection and for each request, all possible scenarios has been documented in the form of examples in postman. The postman collection is exported as a json in `postman_collection.json` which can be found at the root of the project. Import this file into postman.

## Notes

- We have chosen fastify as the underlying http server framework as it is very efficient and faster than the default express server 

## Deployment

### MongoDB Schema change
- Import the db provided in forum in your local machine
- The original database did not have support to store historical data. As per requirement, historical data of reviews, prices, ratings and sentiments had to be stored. So, we had extracted these as separate collections. To help in migrating the existing data to the new database schema, we have written an api /migrate which would automatically transform the data. We have also inserted some random data in the new database for verification.
