const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const { sendError } = require('./utils/response.utils');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Body Parsing Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Hubflow Automation SaaS API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1', routes);

// Handle 404 Route Not Found
app.use((req, res) => {
  return sendError(res, `Cannot ${req.method} ${req.originalUrl} - Route not found`, 404);
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
