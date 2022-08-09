const models = require('./models.js');

const algoController = {};

// Get request for all algo problems 
algoController.getAlgos = (req, res, next) => {  
    models.getAlgoSet()
        .then(data => {
            res.locals.allAlgos = data;
            next()
        })
    // models.find({}).exec()
    
    .catch(err => {
        next({
            log: `algoController.getAlgos ERROR: ${err}`,
            message: {err: 'Error occurred in algoController.getAlgos. Check log for details.'}
        });
    });
}
// Post request to post an algo 
algoController.postAlgo = (req, res, next) => {
  // Fill later once we have keys defined   
  const { algo } = req.body;
  // Fill create method later 
  models.create({

  })
  .then(data => {
      res.locals.newAlgo = data;
      next();
  })
  .catch(err => {
      next({
        log: `algoController.postAlgo ERROR: ${err}`,
        message: {err: 'Error occurred in algoController.postAlgo. Check log for details.'} 
      });
  });
};
// Get a specific algo 
algoController.findAlgo = (req, res, next) => {

}
// Get a set of algos based on search parameters

module.exports = algoController;