const Clarifai = require('clarifai');

// Clarifai
const app = new Clarifai.App({
    apiKey: '04965a4c03484c7a858fbf33003f8409',
});

const handleApiCall = () => (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(error => res.status(400).json('unable to work with API'));
};

const handleImage = db => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0].entries))
        .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall,
}