# TypeMoon
A Simple Typography Tool for the Web


Libraries installed

npm install aws-amplify aws-amplify-react //We need to interact with the appsync api using react.

# AWS Amplifly

Initialized the project using the AWS amplify cli. The amplify cli is a command line interface that allows us to select which AWS services we would want. 

* amplify init

* amplify status: Shows us what's already added to the project.

* amplify push: will build all local backend resources and provision them to the cloud.

Then we need to set up the front end at index.js using

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

# AppSync

We use AppSync in order to create our api. Application Program Interface. How we will interact with out data.
With GraphQL we create Operations such as qeuries, mutations, and subscriptions. The subscriptions are very important for appsync. It's an event
driven system that synchronizes all instances of our app. That way every app is updated at the same time based on the events in the subscription.
The resolvers send the data to the appropriate back end. In the other app I made the resolver communicated with the MangoDB backend. Essentially it
gets or setts data in the backend.


# Backend

The API in this step is a GraphQL API using AWS AppSync (a managed GraphQL service) and the database will be Amazon DynamoDB (a NoSQL database).

* amplify add api

* auth type is api key

* edit the schema

@model is usique to AWS graphql essentially just adds the type as a table in the database.

@connection creates the relatioship between the tables we just give it a name and the connection is made.

After changing the schema amplify push in order to reconfigure all the files to the new updated schema. The queries, mutations and subscriptions will be created as well.

In order to see the API you can 

* amplify console api

From the aws dashboard we can see what we created. The Schema shows us what we made with schema.graphql in the back end folder.

The Datasource tabe on the left shows us the tables we created with the schema as well.

You can add data manually in the querires tab by making your own mutations and queriries.

# GraphQL

amplify mock api

In order to add data visually and query it try the mock api feature. 

Exclamation points are non nullable values


# Connecting the Backend to Frontend

npm install aws-amplify aws-amplify-react //We need to interact with the appsync api using react.

* inside index.js enter this

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);





