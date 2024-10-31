const express = require('express');
const app = express();
const db = require('./config/database');

// Connect Database
db.connectDB();