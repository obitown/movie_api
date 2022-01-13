const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const User = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: ture});

const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

// user list
let users = [
    {
        id: 1,
        name: "Anthony",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "John",
        favoriteMovies: [
            "The Room"
        ]
    }

]

// Movie list
let movies = [
    {
        Title: "The Room",
        Description: "Johnny is a successful bank executive who lives quietly in a San Francisco townhouse with his fiancée, Lisa. One day, putting aside any scruple, she seduces Johnny's best friend, Mark. From there, nothing will be the same again.",
        Genre: {
            Name: "Drama",
            Description: "a movie or television production with characteristics (such as conflict) of a serious play."
        },
        Director: {
            Name: "Tommy Wiseau",
            Bio: "Tommy Wiseau is an American actor, director, screenwriter & producer. He trained to be an actor at: American Conservatory Theater, Vince Chase Workshop, Jean Shelton Acting Lab, Laney College and Stella Adler Academy of Acting.",
            Birth: "1995"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BYjEzN2FlYmYtNDkwMC00NGFkLWE5ODctYmE5NmYxNzE2MmRiXkEyXkFqcGdeQXVyMjMwODc5Mw@@._V1_.jpg",
        Featured: false
    },
    {
        Title: "Superbad",
        Description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        Genre: {
            Name: "Comedy",
            Description: "A comedy film is a category of film which emphasizes humor."
        },
        Director: {
            Name: "Greg Mottola",
            Bio: "Greg Mottola was born on July 11, 1964 in Dix Hills, Long Island, New York, USA as Gregory James Mottola. He is a director and producer, known for Adventureland (2009), The Daytrippers (1996) and Superbad (2007). He is married to Sarah Allentuch. They have three children.",
            Birth: "1964"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Shaun of the Dead",
        Description: "The uneventful, aimless lives of a London electronics salesman and his layabout roommate are disrupted by the zombie apocalypse.",
        Genre: {
            Name: "Comedy",
            Description: "A comedy film is a category of film which emphasizes humor."
        },
        Director: {
            Name: "Edgar Wright",
            Bio: "Edgar Howard Wright (born 18 April 1974) is an English director, screenwriter, producer, and actor. He is best known for his comedic Three Flavours Cornetto film trilogy consisting of Shaun of the Dead (2004), Hot Fuzz (2007), and The World's End (2013), made with recurrent collaborators Simon Pegg, Nira Park and Nick Frost. He also collaborated with them as the director of the television series Spaced.",
            Birth: "1974"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Featured: true
    },
    {
        Title: "28 Days Later...",
        Description: "Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.",
        Genre: {
            Name: "Horror",
            Description: "A horror film is one that seeks to elicit fear or disgust in its audience for entertainment purposes."
        },
        Director: {
            Name: "Danny Boyle",
            Bio: "Danny Boyle was born on October 20, 1956 in Radcliffe, Greater Manchester, England as Daniel Francis Boyle. He is a director and producer, known for 127 Hours (2010), 28 Days Later... (2002) and Slumdog Millionaire (2008).",
            Birth: "1956"
        },
        ImageURL: "",
        Featured: true
    },
    {
        Title: "The World's End",
        Description: "Five friends who reunite in an attempt to top their epic pub crawl from twenty years earlier unwittingly become humanity's only hope for survival.",
        Genre: {
            Name: "Comedy",
            Description: "A comedy film is a category of film which emphasizes humor."
        },
        Director: {
            Name: "Edgar Wright",
            Bio: "Edgar Howard Wright (born 18 April 1974) is an English director, screenwriter, producer, and actor. He is best known for his comedic Three Flavours Cornetto film trilogy consisting of Shaun of the Dead (2004), Hot Fuzz (2007), and The World's End (2013), made with recurrent collaborators Simon Pegg, Nira Park and Nick Frost. He also collaborated with them as the director of the television series Spaced.",
            Birth: "1974"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BNzA1MTk1MzY0OV5BMl5BanBnXkFtZTgwNjkzNTUwMDE@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Saving Private Ryan",
        Description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        Genre: {
            Name: "Drama",
            Description: "a movie or television production with characteristics (such as conflict) of a serious play."
        },
        Director: {
            Name: "Steven Spielberg",
            Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
            Birth: "1946"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Star Wars: Episode VI - Return of the Jedi",
        Description: "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
        Genre: {
            Name: "Action",
            Description: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres."
        },
        Director: {
            Name: "Richard Marquand",
            Bio: "Richard Marquand was born on September 22, 1937 in Llanishen, Cardiff, Glamorgan, Wales as Richard Alfred Marquand. He was a director and producer, known for Star Wars: Episode VI - Return of the Jedi (1983), Jagged Edge (1985) and Nowhere to Run (1993). He was married to Carol Bell and Josephine Marquand. He died on September 4, 1987 in Tunbridge Wells, Kent, England.",
            Birth: "1987"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Pacific Rim: Uprising",
        Description: "Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.",
        Genre: {
            Name: "Action",
            Description: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres."
        },
        Director: {
            Name: "Steven S. DeKnight",
            Bio: "Steven S. DeKnight was born in Millville, New Jersey, USA. He is a producer and writer, known for Pacific Rim: Uprising (2018), Spartacus (2010) and Daredevil (2015). He is married to Jaime Slater.",
            Birth: "1964"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Spider-Man",
        Description: "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
        Genre: {
            Name: "Action",
            Description: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres."
        },
        Director: {
            Name: "Sam Raimi",
            Bio: "Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi's film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from 'Stooges' movies.",
            Birth: "1956"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
        Featured: true
    },
    {
        Title: "Midsommer",
        Description: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
        Genre: {
            Name: "Drama",
            Description: "a movie or television production with characteristics (such as conflict) of a serious play."
        },
        Director: {
            Name: "Ari Aster",
            Bio: "Ari Aster was born on July 15, 1986 in New York City, New York, USA. He is a director and writer, known for Hereditary (2018), Midsommar (2019) and Disappointment Blvd. (2022).",
            Birth: "1986"
        },
        ImageURL: "https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg",
        Featured: true
    }
];

// Logging wth Morgan
app.use(morgan('common'));

// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need a name');
    }
});

// READ
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie');
    }
});

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name == genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre');
    }
});

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name == directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director');
    }
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user)
    } else {
        res.status(400).send('No such user');
    }
});

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send('The movie has been added to your list');
    } else {
        res.status(400).send('No such user');
    }
});

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send('The movie has been removed from your list');
    } else {
        res.status(400).send('No such user');
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('User has been deleted');
    } else {
        res.status(400).send('No such user');
    }
});



//USE
//serving Static files in '/public'
app.use(express.static('public'));

//error handaling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken...');
});

//Listen for requests
app.listen(8080, () => {
    console.log('app is listening on port 8080');
});