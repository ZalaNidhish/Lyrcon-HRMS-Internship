require('dotenv').config({ quiet: true }); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const seedRoles = require('./src/seed/rolesSeeder');
const seedHrUser = require('./src/seed/hrUserSeeder');
const authRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const assetRoutes = require('./src/routes/assetRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

const app = express();

const startServer = async () => {
	await connectDB();
	await seedRoles();
	await seedHrUser();

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer().catch((error) => {
	console.error('Bootstrap seeding error:', error.message);
	process.exit(1);
});

// Security and Parsers Middleware
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

// Main Routing Layers
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/assets', assetRoutes);
