require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const userRoutes = require('./routes/userRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');

// Apply middlewares
const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Connection to MongoDB Atlas
const DB_URI = process.env.DATABASE_URL;
mongoose.connect(
	DB_URI,
	{
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log('Connected to MongoDB Cluster');
	}
);


if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}


// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running at port: ', PORT);
});

// const MongoClient = require('mongodb').MongoClient;
// const DB_URI = process.env.DATABASE_URL;
// const client = new MongoClient(DB_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
// client.connect((err) => {
// 	if (err) throw err;
// 	console.log('Database Connected');
// //	perform actions on the collection object
// 	client.close();
// });
