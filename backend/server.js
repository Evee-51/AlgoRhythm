const path = require('path');
const express = require('express');
const app = express();

const PORT = 3333;

const algoController = require('./algoController');
const userController = require('./userController')
const { appendFile } = require('fs');

let cors = require("cors");
app.use(cors());

app.use(express.json());

// const algoRouter = express.Router();
// app.use('/algos', algoRouter);

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
})

app.use('/bundle.js', express.static('../dist/bundle.js'));

// app.get('/server_getalgos', (req, res) => res.status(200).send('HELLO'));

app.post('/api/getalgos', algoController.getAlgos, algoController.filterAlgos,
  (req, res) => res.status(200).json(res.locals.filteredAlgos)
);

app.post('/api/postalgo', algoController.postAlgo, 
  (req, res) => res.status(200).json(res.locals.newAlgo)
);

app.get('/api/getalgos/:id', algoController.findAlgo,
  (req, res) => res.status(200).json(res.locals.foundAlgo)
);  

app.post('/api/signup', userController.signup,
  (req, res) => res.status(200).json('Signup complete!')
);

app.post('/api/login', userController.verifyUser,
  (req, res) => res.status(200).json(res.locals.login)
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