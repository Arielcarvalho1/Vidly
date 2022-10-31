const express = require("express"); 
// const Joi = require("joi"); We don't use joi in here anymore
const logger = require("./middleware/logger");
const helmet = require("helmet"); // Provides various http headers to make your app more secure
const morgan = require("morgan"); // Will log every request
const config = require("config");
const genres = require("./routes/genres"); // Get the genres.js module
const home = require("./routes/home");

const app = express();

// Allow the parsin of json, otherwise you'll get undefined whenever you try to read
// the body of a post request
app.use(express.json());

// Check which evironment the app is running at
console.log(app.get("env"));

// Setting up a custom middleware
app.use(logger);
app.use(helmet());

// The middlewares to be used when certain routes are called
app.use("/api/v1/genres", genres); 
app.use("/api/v1", home);

// Configuration
console.log("My app name: " + config.get("name"));

// Only run the logger if in development environment
if(app.get("env") === "development"){
    app.use(morgan("tiny"));
    console.log("morgan is running");
} 

app.listen(3000);                     

console.log("Listening on port 3000"); 