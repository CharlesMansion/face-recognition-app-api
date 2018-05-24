const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'face-recognition-app'
  }
});

postgres.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	console.log("It's Working!")
	res.json(postgres.users)
})

app.post('/signin', signIn.handleSignIn(postgres, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt)});

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, postgres)});

app.put('/image', (req, res) => { image.handleImage(req, res, postgres)});



// bcrypt.compare("bacon", hash, function(err, res) {
// 	//res == true
// });

// bcrypt.compare("bacon", hash, function(err, res) {
// 	//res == false
// });

app.listen(3001, () => {
	console.log("Server is running on port 3001")
})
