const {constants} = require("../constants.js");

const errorHandler = (err, req, res, next) => {
	const statusCode = err.status ? err.status : 500;

	//res.status(err.status || 500)

	switch (statusCode) {
		case constants.VALIDATION_ERROR:
			res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack });
			break;
		case constants.NOT_FOUND:	
			res.json({title: "Not Found Failed", message: err.message, stackTrace: err.stack });
			break;
		case constants.UNAUTHORIZED:	
			res.json({title: "Unauthorized", message: err.message, stackTrace: err.stack });
			break;
		case constants.FORBIDDEN:	
			res.json({title: "Forbidden", message: err.message, stackTrace: err.stack });
			break;
		case constants.SERVER_ERROR:	
			res.json({title: "An internal server error occurred", message: err.message, stackTrace: err.stack });
			break;
		default:
			console.lot("No Error: All good!");
			break;
	}
	
	
}

module.exports = errorHandler;