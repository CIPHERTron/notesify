require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');

// Apply middlewares
const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Listen Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log('Server running at port: ', PORT);
});

// Connection to MongoDB Atlas
const MongoClient = require('mongodb').MongoClient;
const DB_URI = process.env.DATABASE_URL;
const client = new MongoClient(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client.connect((err) => {
	if (err) throw err;
	console.log('Database Connected');
	// perform actions on the collection object
	client.close();
});
