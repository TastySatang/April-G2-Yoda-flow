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
3. Create a .env file based on the example with proper setting for your development environment
4. Setup your PostgreSQL user, passwor and database and make sure it matches your .env file
5. Migrate your database, seed your database and run the app
```bash
npx sequelize-cli db:migrate
```

```bash
npx sequelize-cli db:seed:all
```

```bash
npm start
```
