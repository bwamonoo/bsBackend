const express = require('express');
const app = express();
const { sequelize } = require('./models');
const blogRoutes = require('./config/routes.js');
const errorHandler = require("./controllers/errorHandler.js");

// Middleware
app.use(express.json());

// Routes

// blogRoutes
app.use('/blogs', blogRoutes);
app.use(errorHandler);

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

// Test DB connection and start server

startServer();





