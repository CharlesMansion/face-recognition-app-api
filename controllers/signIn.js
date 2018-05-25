const handleSignIn = (postgres, bcrypt) => (req, res) => {
	
const {email, pwd } = req.body;
	
	if (!email || !pwd) {
		return res.status(400).json('incorrect form submission');
	}
	postgres.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(pwd, data[0].hash);
		if (isValid) {
			return postgres.select("*").from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignIn: handleSignIn
};