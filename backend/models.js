const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myURI = ''
const models = {};

mongoose.connect(myURI, function(err) {
    if (err) {
        console.log(err);
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to database!');
})

const URI = process.env.MONGO_URI || myURI;

const AlgoSchema = new Schema({
    company: String,
    question: String,
    language: String,
    creator: String,
    date: {type: Date, default: Date.now()}
});

const UserSchema = new Schema({
    username: String,
    password: String,
    first: String,
    last: String
})

const algoModel = mongoose.model('Algo', AlgoSchema);
const userModel = mongoose.model('User', UserSchema);

//Post algo
models.postAlgo = function (company, question, language, creator) {
    return new Promise((resolve, reject) => {
        algoModel.create({company, question, language, creator}, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            resolve(data);
        });
    })
}

//Get specific algo
models.findAlgo = function (id) {
    return new Promise((resolve, reject) => {
        algoModel.findOne({_id: id}, (err, algo) => {
            if(err) {
                reject(err);
            }
    
            resolve(algo);
        });
    })
}

//Get a set of algos
models.getAlgoSet = function (req, res, next) {
    return new Promise((resolve, reject) => {
        algoModel.find({}, (err, algos) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            resolve(algos);
        })
    })
}

//Post user
models.postUser = function (username, password, first, last) {
    return new Promise((resolve, reject) => {
        userModel.create({username, password, first, last}, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            resolve(data);
        });
    });
}

//Verify login
models.verifyLogin = function (username, password) {
    return new Promise((resolve, reject) => {
        userModel.findOne({username, password}, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            if(data) resolve(data._id);
            else return resolve(false);
        });
    })
}

module.exports = models;
