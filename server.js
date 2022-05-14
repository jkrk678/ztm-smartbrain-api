const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

// Testing DB
const db = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date(),
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com',
        },
    ],
};

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send(db.users);
});

app.post('/signin', (req, res) => {
    // bcrypt.compare('jerky', '$2a$10$WkNaprH5ASx8H1Vddu49TeeGFg6YaKRyq0xPsOuxVeST3h1GI92TS', (err, res) => {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare('veggies', '$2a$10$WkNaprH5ASx8H1Vddu49TeeGFg6YaKRyq0xPsOuxVeST3h1GI92TS', (err, res) => {
    //     console.log('second guess', res)
    // });
    if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
        res.json(db.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const { name, email } = req.body;
    const user = {
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date(),
    };
    db.users.push(user);
    res.json(db.users[db.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.users.forEach(user => {
        if (user.id === id) return res.json(user);
    });
    res.status(404).json('Not found');
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries);
        };
    });
    res.status(404).json('Not found');
});

// Listening
app.listen(3000, () => {
    console.log('listening on PORT 3000');
});