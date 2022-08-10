const models = require('./models');

const algoController = {};

// Get request for all algo problems 
algoController.getAlgos = (req, res, next) => {  
    console.log('Urlencoded body: ', req.query);
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

algoController.filterAlgos = (req, res, next) => {
    const allAlgos = res.locals.allAlgos;

    const filteredAlgos = [];

    //Remove spaces and casing for searching
    let {search, language} = req.query;

    //If search and language are either undefined or empty...
    if((search === undefined || search === '') && (language === undefined || language === '')) {
        //Just return all the algos
        res.locals.filteredAlgos = allAlgos;
        return next();
    }

    search = search.toLowerCase().replace(' ', '');
    language = language.toLowerCase().replace(' ', '');

    let keywords = [];
    if(search.includes(',')) {
        keywords = search.split(',');
    }
    else {
        keywords.push(search);
    }

    try {
        //Index of algos already looked up
        const alreadyIn = [];
        for(let searches = 0; searches < keywords.length; searches++) {
            const s = keywords[searches];

            for(let i = 0; i < allAlgos.length; i++) {
                //Skip if this algo has already been added to the filteredAlgos array
                if(alreadyIn.includes(i)) continue;

                const algo = allAlgos[i];

                //Search if keyword (s) is in properties of obj
                //If search is empty or space just let em have it
                if((s === '' || s === ' ') || algo.company.toLowerCase().replace(' ', '').includes(s) || algo.question.toLowerCase().replace(' ', '').includes(s)) {
                    //Add only if language is not set to anything or if the language matches the algo's language
                    if(language === '' || language === ' ' || algo.language.toLowerCase().replace(' ', '') === language) {
                        alreadyIn.push(i);
                        filteredAlgos.push(algo);
                    } 
                }
            }
        }

        res.locals.filteredAlgos = filteredAlgos;
        next();
    }
    catch (err) {
        next({
            log: `algoController.filterAlgos ERROR: ${err}`,
            message: {err: 'Error occured in algoController.filterAlgos. Check log for details.'}
        });
    }
}

// Post request to post an algo 
algoController.postAlgo = (req, res, next) => {
  // Fill later once we have keys defined   
  console.log(req.body);
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