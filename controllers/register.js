const handleRegister = (req, res, postgres, bcrypt) => {
const {email, name, pwd } = req.body;
	const hash = bcrypt.hashSync(pwd);
	postgres.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return postgres('users')
			.returning('*')
			.insert({
				email: email,
				name: name,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollBack)
	})
	.catch(err => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister: handleRegister
};