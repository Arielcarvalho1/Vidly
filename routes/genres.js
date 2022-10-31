const express = require("express");
const router = express.Router(); // Get a router for our module
const Joi = require("joi");

const genres = [         

    {                   
        id: 1,          
        genre: "action"
    },
    {
        id: 2,
        genre: "romance"
    },
    {
        id: 3,
        genre: "drama"
    }
];


function findGenre(id) {
    return genres.find((genre) => genre.id === parseInt(id));
}

function validate(input) {
    const schema = {
        genre: Joi.string().min(3).required()
    };

    const result = Joi.validate(input, schema);
    return result;
}

// All the routes that handle genre
// /api/v1/genres/

router.get("/", (request, response) => {
    response.send(genres);
});

router.get("/:id", (request, response) => {
    const id = request.params.id;
    const genre = findGenre(id);

    if(!genre) {
        return response.status(404).send("No such genre");
    }

    return response.send(genre);
});


// The routes to handle genres

router.post("/", (request, response) => {
    // Todo: Validate input later
    const genre = request.body.genre;
    const input = request.body;

    // You need to give it the input so it can validate it. Not the specific value you want to validate.
    // Also, it's going to return either an error or the value. Never both
    const result = validate(input);

    if(result.error) {
        return response.status(400).send(result.error.details[0].message);
    }

    const createdGenre = {
        id: genres.length + 1,
        genre: genre
    };

    genres.push(createdGenre);

    return response.send(createdGenre);
});

router.put("/:id", (request, response) => {
    const id = request.params.id;
    const newGenre = request.body.genre;
    const genre = findGenre(id);
    const input = request.body;

    // if not found will be undefined
    if(!genre) return response.status(404).send("No such genre");

    const result = validate(input);

    // Check for error
    if(result.error) return response.status(400).send(result.error.details[0].message);

    genre.genre = newGenre;

    return response.send(genre);
});

router.delete("/:id", (request, response) => {
    const id = request.params.id;
    const genre = findGenre(id);
    
    // If it doesn't exist no need to delete. Just return not found
    if(!genre) return response.status(404).send("No such genre");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Then by convention we return the element that was deleted
    console.log(genres);
    return response.send(genre);

});


// Export the router so we can get all the methods defined in here
module.exports = router;