#Infant Nutrition Backend api

This repository consists of a set of apis to query info about products, brands etc

## Tech Stack / Pre-requisites

This project is built using nestjs with fastify. The underlying database is mongodb and we have used typeORM to fetch this data. 

## Deployment

### Setting up the Initial Database

The original database did not have support to store historical data. As per requirement, historical data of reviews, prices, ratings and sentiments had to be stored. So, we had extracted these as separate collections.
To help in migrating the existing data to the new database schema, we have written an api /migrate which would automatically transform the data.
We have also inserted some random data in the new database for verification.

As we need to change the schema, we need a mongodb server with a write access.
Once setup the mongodb, follow the below steps to update the database schema.

- Download the original [DB](https://tc-nutrition-data.s3.amazonaws.com/nutrition.zip) and extract to a [FOLDER]
- Launch mongo shell & and create a new database called 'nutrition_v1' using below command

     ```use nutrition_v1```
- Launch a normal terminal and run the below command to import the database to your local mongo db server.

    ``` mongorestore -d nutrition_v1 [FOLDER_PATH]/ ```
- Then update the mongodb configuration(like db url, username, password etc) in [app.module.js](src/app.module.ts)

### Running the application

To run the app, run the below commands
```yarn install
    yarn start
```

### Update Database schema

Once you launch the application, navigate to [http://localhost:3000/migrate] endpoint to begin the migration. 
Migrate endpoint will automatically update the existing database with the new schema. 

Once this is successful, you can check other endpoints.

## Verification Document

To verify that all the apis are working as expected, you can refer to the [postman collection](postman_collection.json). There are 11 request in this collection and for each request, all possible scenarios has been documented in the form of examples in postman. The postman collection is exported as a json in `postman_collection.json` which can be found at the root of the project. Import this file into postman.

You can see all the endpoints in swagger [docs](swagger_docs.json) as well.

http://localhost:3000/docs

## Notes

- As the original database is heavy in size, it takes a long time to download and migrate the data(>1.5GB) inside the lightweight docker container. We have docker-compose to launch the app and db once ready in the future. 
- We have chosen fastify as the underlying http server framework as it is very efficient and faster than the default express server




