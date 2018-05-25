
const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ba14731d87a44d498fba56b4434db4d1'
});

const handleAPICall = (req, res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, postgres) => {
	const { id } = req.body;
	postgres('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
	 res.json(entries[0]);
	})
	.catch(err => res.status(400).json('error getting entries data'))
}

module.exports = {
	handleImage, handleAPICall
}