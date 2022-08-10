const models = require('./models');

const userController = {};

// Get request for all algo problems 
userController.signup = (req, res, next) => {  
    console.log('Attempted signup with: ', req.body);
    const {username, password, first, last} = req.body;

    if(username === '' || password === '' || first === '' || last === '') {
        return next({
            log: `userController.getAlgos ERROR: Invalid signup information`,
            message: {err: 'Please make sure all required credentials are filled in.'}
        });
    }

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

            res.locals.login = true;
            //Auth logic

            next();
        }
        else {
            console.log('Couldn\'t find user with your credentials.');
            
            res.locals.login = false;
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