const express = require("express");
const router = express.Router();

router.get("/", (request, response) => { 
    response.send("Welcome to vidly");
});

// Exporting the router with the defined verbs
module.exports = router;
