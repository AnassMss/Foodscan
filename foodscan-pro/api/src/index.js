const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Routes
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const mealsRoutes = require('./routes/meals');
const recipesRoutes = require('./routes/recipes');
const tipsRoutes = require('./routes/tips');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/tips', tipsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export prisma client for use in other files
module.exports = { prisma }; 