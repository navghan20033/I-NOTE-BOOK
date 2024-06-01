const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://kabiranavghan2454:2332@cluster0.0l2w7fq.mongodb.net/iNotebook"


const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => console.log('connected'))
}

module.exports = connectToMongo;