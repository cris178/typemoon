# TypeMoon

![TypeMoon Mobile View](https://i.imgur.com/neo2XM9.png)

[TypeMoon Website](https://typemoon.app)

A Simple Twitter clone built using an AWS cloud stack including services such as Appsync, GraphQL, Amazon Dynamo DB, 


Libraries installed

npm install aws-amplify aws-amplify-react //We need to interact with the appsync api using react.

# Hosting

AWS hosting allows for you're app to have CI/CD capabilities through Github. The main branch will be checked for changes and then built and deployed by AWs.
AWS also allows for existing domains to connect to the web app.

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


# Authentication

* amplify add auth


Using Amazon Cognito we can authenticate users. We used default config, username, and done.
We need to add this to app 

* export default withAuthenticator(App,{includeGreetings:true});


# React Hooks

This app is the first time using stateful functions instead of the standard components. UseEffect is several React lifecycle methods combined into one.
Usestate is pretty much that same old state management but with built in setters and getters. Use context allows us to send props several level deep without 
passing props.


# Subscriptions

Thanks to app sync subscriptions are a powerful took that automatically update our app when new data is added to the database. The cool thing about appsync is it will automaticlally
update all apps running our code. If the app isn't auto updating it's a pretty clear indication that the subscription wasn't probably configured or unsubscribed. Comments weren't showing
up unless I reloaded the page, it even auto relaoded at one point. It was all because I miss typed the subscription name wrong in the unsubscribe portion. It would even run the subscription multiple times
causing a huge head scratcher!

# Bugs

Some issues too look into or solved issues that were interesting. 


EditPost Subscription:  In order to edit a post the subscription needed to fire when the async updatepost call was made. After that async function I had a hide modal function fire afterwards which also happened in the same js file that the subscription ran. My theory is the subscription didn't run because the handleModal function was running instead. 




# Cool Packages

React Icons

https://www.npmjs.com/package/react-icons

https://react-icons.github.io/react-icons/icons?name=fa

The second links shows the name of each icon from the pack.
