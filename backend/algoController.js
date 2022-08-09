const models = require('./models');

const algoController = {};

// Get request for all algo problems 
algoController.getAlgos = (req, res, next) => {  
    models.getAlgoSet()
    .then(data => {
        res.locals.allAlgos = data;
        console.log('Got algo: ', data);
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
  // Fill later once we have keys defined   
  const { company, question, language } = req.body;
  // Fill create method later
  models.postAlgo(company, question, language, 5)
  .then(data => {
      res.locals.newAlgo = data;
      console.log('Posted algo: ', data);
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
    models.findAlgo(req.params.id)
    .then(data => {
        res.locals.foundAlgo = data;
        console.log('Found algo: ', data);
    })
    .catch(err => {
        next({
            log: `algoController.findAlgo ERROR: ${err}`,
            message: {err: 'Error occured in algoController.findAlgo. Check log for details.'}
        });
    })
}
// Get a set of algos based on search parameters

module.exports = algoController;