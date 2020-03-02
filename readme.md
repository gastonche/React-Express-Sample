# Welcome To ProductR

This is a guide to help you setup the project properly on your local environment.

## Requirements

1. To setup this project locally you will need a **MongoDb** server running. You can set up one by going to [https://mongodb.github.io/node-mongodb-native/3.2/](https://mongodb.github.io/node-mongodb-native/3.2/)
1. You need have **NodeJs** and **npm** installed on your local machine. You can set it up from here [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 

## Steps to Setup

1. Clone this repo
2. *cd* into the project folder
3. ```cd client```
4. ```npm install```
5. ```cd ../server```
6. ```npm install```
7. ```cd ..```
8. ```npm install```
8. ```npm start```

## About the implementation

The project is structured in two folders. There is a client and a server folder. 

- The client is implemented in **ReactJs**, using redux for state management.
- The server is implemented in **ExpressJs**
- We make use of **socket io** to keep the client and server in sync
- **JWT** is used for authentication and authorization between the client and server.