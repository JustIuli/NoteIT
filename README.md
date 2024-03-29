
![Logo](https://iili.io/JWzGYWN.md.png)


NoteIt is a web application for designed for creating and managing notes. It provides features such as the ability to add and sort notes by utilizing tags , search notes , and removing your notes.


## Installation

Install with npm

```bash
    cd noteIt
    npm run install-all
```

Install with yarn

```bash
    cd noteIt
    yarn install-all
```

This will run npm install / yarn inside both of the folders .

## 
Environment

To ensure smooth operation, this application relies on MongoDB, requiring certain environment variables to be defined within a .env file. Here are some examples:

- MONGO_URI: Used for establishing a connection to the MongoDB database.

- CLIENT_URL: Necessary for handling Cross-Origin Resource Sharing (CORS).

- SECRET: Employed for generating JWT tokens within the application.

Be sure to set these variables in your .env file according to your specific configuration needs.
