require('dotenv').config();
const express = require('express');
const http = require('http');
const sequelize = require('./configs/database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce backend running' });
});

const authRoutes = require("./routes/api");

app.use("/api/", authRoutes);

const PORT = process.env.PORT || 8000;

sequelize
	.authenticate()
	.then(async () => {
		http.createServer(app).listen(PORT, () => {
			console.log(`Server started at port: ${PORT}`);
		});
	}).catch((err) => console.log(err));