const models = require('./models.js');

const algoController = {};

// Get request for all algo problems 
algoController.getAlgos = (req, res, next) => {
    models.find({}).exec()
    .then(data => {
        res.locals.allAlgos = data;
        next();
    })
    .catch(err => {
        next({
            log: `algoController.getAlgos ERROR: ${err}`,
            message: {err: 'Error occurred in algoController.getAlgos. Check log for details.'}
        });
    });
}
// Post request to post an algo 
algoController.postAlgo = (req, res, next) => {

}
// Get a specific algo 
algoController.findAlgo = (req, res, next) => {

}
// Get a set of algos based on search parameters

module.exports = algoController;