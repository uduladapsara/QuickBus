// backend/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Bus = require('./models/Bus');
const HireVehicle = require('./models/HireVehicle');
const BusSchedule = require('./models/BusSchedule');

dotenv.config();

const cities = ['Colombo', 'Galle', 'Kataragama', 'Kaluthara', 'Jafna', 'Kandy', 'Gampaha', 'Anuradhapura', 'Monaragala', 'Negambo', 'Ampara', 'Beliaththa', 'Badulla'];

const busOperators = ['National Travels', 'Lanka Bus', 'Express Line', 'Comfort Ride', 'City Link', 'Royal Tours', 'Silver Star', 'Blue Line'];

const busTypes = ['Seater', 'A/C Seater', 'Non-A/C', 'Sleeper'];

const generateBuses = () => {
  const buses = [];
  for (let i = 0; i < 30; i++) {
    const source = 'Matara';
    const destination = cities[Math.floor(Math.random() * cities.length)];
    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    const durationHours = Math.floor(Math.random() * 8) + 4;
    const arrivalHour = (departureHour + durationHours) % 24;
    
    buses.push({
      operatorName: busOperators[Math.floor(Math.random() * busOperators.length)],
      busNumber: `QB-${1000 + i}`,
      busType: busTypes[Math.floor(Math.random() * busTypes.length)],
      totalSeats: 40,
      amenities: ['Charging Point', 'Water Bottle', 'WiFi', 'Blanket'].slice(0, Math.floor(Math.random() * 3) + 1),
      sourceCity: source,
      destinationCity: destination,
      departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
      arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
      duration: `${durationHours}h`,
      fare: Math.floor(Math.random() * 1500) + 500,
      liveTracking: Math.random() > 0.5,
      reschedulable: Math.random() > 0.3,
      redDeal: Math.random() > 0.7,
      operatorRating: (Math.random() * 2 + 3).toFixed(1)
    });
  }
  return buses;
};

const generateHireVehicles = () => {
  return [
    { name: 'Toyota Axio', type: 'Sedan', capacity: 4, pricePerKm: 15, basePrice: 500, minKm: 50, amenities: ['AC', 'Music System', 'Water Bottle'] },
    { name: 'Suzuki Wagon R', type: 'Sedan', capacity: 4, pricePerKm: 12, basePrice: 450, minKm: 50, amenities: ['AC', 'Charging Point'] },
    { name: 'Toyota KDH', type: 'SUV', capacity: 7, pricePerKm: 20, basePrice: 800, minKm: 80, amenities: ['AC', 'Music System', 'Extra Luggage'] },
    { name: 'Nissan Van', type: 'Tempo', capacity: 12, pricePerKm: 25, basePrice: 1200, minKm: 100, amenities: ['AC', 'TV', 'Water'] },
    { name: 'Lanka Ashok Leyland', type: 'Mini Bus', capacity: 30, pricePerKm: 35, basePrice: 2000, minKm: 150, amenities: ['AC', 'Push Back Seats', 'Charging'] },
    { name: 'Volvo Coach', type: 'Coach', capacity: 45, pricePerKm: 50, basePrice: 3500, minKm: 200, amenities: ['AC', 'Entertainment System', 'Restroom'] }
  ];
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Bus.deleteMany();
    await HireVehicle.deleteMany();
    await BusSchedule.deleteMany();
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      phone: '0771234567',
      isAdmin: true
    });
    
    // Create regular user
    await User.create({
      name: 'Test User',
      email: 'test@quickbus.com',
      password: 'test123',
      phone: '0777654321',
      isAdmin: false
    });
    
    // Create buses
    const buses = generateBuses();
    const createdBuses = await Bus.insertMany(buses);
    
    // Create bus schedules for next 30 days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const travelDate = new Date(today);
      travelDate.setDate(today.getDate() + i);
      travelDate.setHours(0, 0, 0, 0);
      
      for (const bus of createdBuses) {
        // Randomly book some seats for demo
        const bookedCount = Math.floor(Math.random() * 15);
        const bookedSeats = [];
        for (let j = 0; j < bookedCount; j++) {
          bookedSeats.push(`S${Math.floor(Math.random() * bus.totalSeats) + 1}`);
        }
        
        await BusSchedule.create({
          busId: bus._id,
          travelDate,
          bookedSeats: [...new Set(bookedSeats)],
          availableSeats: bus.totalSeats - bookedSeats.length,
          totalSeats: bus.totalSeats
        });
      }
    }
    
    // Create hire vehicles
    await HireVehicle.insertMany(generateHireVehicles());
    
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();