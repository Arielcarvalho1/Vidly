const { response } = require("express");
const Express = require("express");   
                                      
const app = Express()                 

// Allow the parsin of json, otherwise you'll get undefined whenever you try to read
// the body of a post request
app.use(Express.json());

// TODO: move find over to a function since it's being used more than once

app.listen(3000);                     

console.log("Listening on port 3000"); 
                                      
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
]                  
                                      
app.get("/", (request, response) => { 
    response.send("Welcome to vidly");
});                                   

app.get("/api/v1/genres", (request, response) => {
    response.send(genres);
});

app.get("/api/v1/genres/:id", (request, response) => {
    const id = request.params.id;
    const genre = genres.find((genre) => genre.id === parseInt(id));

    if(!genre) {
        return response.status(404).send("No such genre");
    }

    return response.send(genre);
});


app.post("/api/v1/genres", (request, response) => {
    // Todo: Validate input later
    const genre = request.body.genre;

    const createdGenre = {
        id: genres.length + 1,
        genre: genre
    };

    genres.push(createdGenre);

    return response.send(createdGenre);
});

app.put("/api/v1/genres/:id", (request, response) => {
    // Todo: Validate input later
    const id = request.params.id;
    const newGenre = request.body.genre;
    const genre = genres.find((genre) => genre.id === parseInt(id));

    // if not found will be undefined
    if(!genre) return response.status(404).send("No such genre");

    genre.genre = newGenre;

    return response.send(genre);
});

app.delete("/api/v1/genres/:id", (request, response) => {
    const id = request.params.id;
    const genre = genres.find((genre) => genre.id === parseInt(id));
    
    // If it doesn't exist no need to delete. Just return not found
    if(!genre) return response.status(404).send("No such genre");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Then by convention we return the element that was deleted
    console.log(genres);
    return response.send(genre);

});