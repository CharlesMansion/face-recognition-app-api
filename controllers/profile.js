const handleProfile = (req,res, postgres) => {
	const { id } = req.params;
	let found = false;	
	postgres.select('*').from('users').where({id})
	.then(user => {
		if (user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('user not found')
		}
	})
	.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProfile: handleProfile
};