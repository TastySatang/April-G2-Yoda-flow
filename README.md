# Yoda-flow

Yodaflow is an web-ap that allows users to ask and answer questions related to starwars

### Technologies used

* PostgreSQL
* Express
* Sequelize
* Pug
* JavaScript
* CSS3
* HTML5

## Installing
1. Clone this repository (only this branch)
2. Install dependencies
```bash
npm install
```
4. Create a .env file based on the example with proper setting for your development environment
5. Setup your PostgreSQL user, passwor and database and make sure it matches your .env file
6. Migrate your database, seed your database and run the app
```bash
npx sequelize-cli db:migrate
```

```bash
npx sequelize-cli db:seed:all
```

```bash
npm start
```
