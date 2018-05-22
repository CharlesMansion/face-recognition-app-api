const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(cors());

const db = {
	users: [
		{
			 id:'123',
			 name: 'Kendrick',
			 email: 'kendrick@gmail.com',
			 pwd: 'humble',
			 entries : 0,
			 joined : new Date()
		},
		{
			id:'124',
		 	name: 'Frank',
		 	pwd : 'blonde',
		 	email: 'frank@gmail.com',
		 	entries : 0,
		 	joined : new Date()
		}
	],
	login: [
	{
		id: '987',
		hash:'',
		email: 'kendrick@gmail.com'
	}
	]
}

app.get('/', (req, res) => {
	console.log("It's Working!")
	res.json(db.users)
})

app.post('/signin', (req, res) => {
	if (req.body.email === db.users[0].email && req.body.pwd === db.users[0].pwd) {
		res.json(db.users[0]);
	} else {
		res.status(400).json('errorrrr login in!');
	}
})

app.post('/register', (req, res) => {
	const {name, email, pwd } = req.body;
	bcrypt.hash(pwd, null, null, function(err, hash) {
	console.log(hash);
});
	db.users.push({
			id:'125',
		 	name: name,
		 	email: email,
		 	entries : 0,
		 	joined : new Date()
		})
	res.json(db.users[db.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;	
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
		})
		if (!found) {
			res.status(404).json('user not found');
		}
})

app.put('/image',(req, res) => {
	const { id } = req.body;
	let found = false;	
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		} 
		})
		if (!found) {
			res.status(404).json('user not found');
		}
})



// bcrypt.compare("bacon", hash, function(err, res) {
// 	//res == true
// });

// bcrypt.compare("bacon", hash, function(err, res) {
// 	//res == false
// });

app.listen(3001, () => {
	console.log("Server is running on port 3001")
})
