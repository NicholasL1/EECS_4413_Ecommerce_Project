//#region Tutorial + Use-case

/*
  When a user is registered/logged-in, a TOKEN is gererated and returned. Seen in the
  login and register endpoints in UserContoller. The TOKEN will be returned to the front-end
  where it will be stored in LOCALSTORAGE so we can use it later.

  We use this TOKEN to verify is the user is currently logged-in and can access certain
  protected features of the application such as Admin or Retrieving sales orders.

  The TOKEN carries the user_id, email, password, first and last name, and address. When
  we need to access any of these attributes, we use

    req.user['userData'][<index of what attribute you need>]
    
    *note -- index used only b/c it's defined like that when generating token

    ex: req.user['userData'][0] returns the user_id since that is at index 0

  How to verify? In every endpoint in the controller class, we place this function
  *verifyToken* which will verify the token.

    ex: router.post('/exampleEndpoint', verifyToken, async (req, res) => {
        const user_id = req.user['userData'][0]

        // call a function needing the user_id parameter
      })

  In the future when developing the front-end, we'll call the endpoints and add the 
  *Authorization Header* where the value would be the TOKEN we generate at login/registration


*/

//#endregion

const dotenv = require("dotenv").config(); // Retrieves sensitive values from .env file, I.E.: API Keys, Passwords, etc
const jwt = require('jsonwebtoken'); // Ensure you have jwt imported

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).send('Login Required');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded token to request object
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
};

module.exports = verifyToken;
