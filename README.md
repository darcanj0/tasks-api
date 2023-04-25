
# Tasks App Api

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

I strongly advise you to run your database locally. Install MongoDB on your device.
If you manage to do so, just add "mongodb://127.0.0.1:27017" as your database url and things should work out fine.

`JWT_SECRET="<any_password>"`

`DATABASE_URL="<database address>"`

If you can't run mongo locally, try to connect to a mongodb atlas instance. For me, it didnt work, but it is worth a try.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod


```

## Docs

To Access the swagger doc page go to "/docs"

[access docs locally](http://localhost:3000/docs)
