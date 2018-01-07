# Starship registry

Welcome to my personal fun project!

I thought I'd make a silly RESTful API that tracks Star Trek `starships`, and where they are docked/based via `shipyards`.

The project primarily uses:
- `express`
- `mongodb`

### Install `nodejs`

`$ brew install nodejs`

### Install `mongodb`

`$ brew install mongodb`

In `Macintosh HD`, create `/data/db` so Mongo can store databases.

Next, create a `starships` database. Run `mongod`, then open another terminal and run `mongo`.

In the mongo terminal:
```
> use starships
> db.users.save( {username:"starships"} )
> exit
```

### Run Service

`npm install -g nodemon`
`nodemon server.js`

Please feel free to chime in with comments!
