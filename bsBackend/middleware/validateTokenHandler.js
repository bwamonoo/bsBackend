const asyncHandler = require('./asyncHandler.js');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler( async (req, res, next) => {
	try{
		let token;
		let authHeader = req.headers.Authorization || req.headers.authorization;

		if(authHeader && authHeader.startsWith('Bearer')) {
			token = authHeader.split(" ")[1];
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
				if(error) {
					return res.status(401).json({ error: 'User is not authorized!' });
				}
				 
				req.user = decoded.user;
				next()
			});
		}	
			if(!token) {
				return res.status(401).json({ error: 'User is not authorized or token is missing!' });
			}
		
	} catch(error) {
		next(error)
	}
	
});

module.exports = validateToken;