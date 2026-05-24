// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/hire', require('./routes/hireRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const ensureAdminUser = async () => {
	const adminEmail = process.env.ADMIN_EMAIL;
	const adminPassword = process.env.ADMIN_PASSWORD;

	if (!adminEmail || !adminPassword) {
		console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is not set. Admin user not created.');
		return;
	}

	const existing = await User.findOne({ email: adminEmail });
	if (existing) {
		if (!existing.isAdmin) {
			existing.isAdmin = true;
			await existing.save();
		}
		return;
	}

	await User.create({
		name: 'Admin',
		email: adminEmail,
		password: adminPassword,
		phone: '0000000000',
		isAdmin: true
	});
};

const startServer = async () => {
	await connectDB();
	await ensureAdminUser();

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();