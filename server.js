const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Database
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Success'));
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());

// Listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});