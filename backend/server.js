console.log('hello');

const path = require('path');
const express = require('express');
const app = express();

const PORT = 3333;

const algoController = require('./controllers.js');
const { appendFile } = require('fs');


app.use(express.json());

const algoRouter = express.Router();
app.use('/algos', algoRouter);

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
})

algoRouter.get('/', algoController.getAlgos,
  (req, res) => res.status(200).json(res.locals.allAlgos)
);

algoRouter.post('/', algoController.postAlgo, 
  (req, res) => res.status(200).json(res.locals.newAlgo)
);

// Global error handler 
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }); 

app.listen(PORT, () => {
    console.log(`Server listening on port; ${PORT}`);
});

module.exports = app; 