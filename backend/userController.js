const models = require('./models');

const userController = {};

// Get request for all algo problems 
userController.signup = (req, res, next) => {  
    console.log('Attempted signup with: ', req.body);
    const {username, password, first, last} = req.body;
    models.postUser(username, password, first, last)
    .then(data => {
        console.log('Posted user: ', data);
    })
    .catch(err => {
        next({
            log: `userController.getAlgos ERROR: ${err}`,
            message: {err: 'Error occurred in userController.signup. Check log for details.'}
        });
    });
}

userController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    models.verifyLogin(username, password)
    .then(data => {
        if(data) {
            console.log('Login verified!');

            //Auth logic

            next();
        }
        else {
            console.log('Couldn\'t find user with your credentials.');

            //Reject login logic

            next();
        }
    })
    .catch(err => {
        next({
            log: `userController.verifyUser ERROR: ${err}`,
            message: {err: 'Error occurred in userController.verifyUser. Check log for details.'}
        });
    });
}

module.exports = userController;