const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

//app config
dotenv.config();
const app = express();
const uri = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());

//Db connection
mongoose
	.connect(uri)
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => console.log(err));

// routes
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

//listen to express app
app.listen(8800, () => {
	console.log("Server is running...");
});
