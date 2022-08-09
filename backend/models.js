const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myURI = 'mongodb+srv://ilijacodes:Codesmith69!@cluster0.yobqo.mongodb.net/?retryWrites=true&w=majority'
const models = {};

const AlgoSchema = new Schema({
    company: String,
    question: String,
    language: String,
    date: Date,
    creator: ObjectId
});

const UserSchema = new Schema({
    username: String,
    password: String
})

const algoModel = mongoose.model('Algo', AlgoSchema);
const userModel = mongoose.model('User', UserSchema);

//Post algo
models.postAlgo = function ({company, question, language, creator}) {
    new Promise((resolve, reject) => {
        algoModel.create({company, question, language, date: Date.now(), creator}, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            resolve(data);
        });
    })
}

//Get specific algo
models.getAlgo = function (id) {
    new Promise((resolve, reject) => {
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
    new Promise((resolve, reject) => {
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
models.postUser = function ({username, password}) {
    new Promise((resolve, reject) => {
        userModel.create({username, password}, (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            }
    
            resolve(data);
        });
    });
}

//Verify login
models.verifyLogin = function ({username, password}) {
    new Promise((resolve, reject) => {
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

export default models;