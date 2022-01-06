const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

// const bodyParser = require('body-parser'),
//     methodOverride = require('method-override');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
// app.use(methodOverride());

//Movie list
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
        ImageURL: "https://s.movieinsider.com/images/p/600//486806_m1513803654.jpg",
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
        ImageURL: "",
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
        ImageURL: "",
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
        Title: "Die Hard",
        Description: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
        Genre: {
            Name: "John McTiernan",
            Description: "John McTiernan was born on January 8, 1951 in Albany, New York, USA as John Campbell McTiernan Jr. He is a director and producer, known for Die Hard (1988), Rollerball (2002) and Last Action Hero (1993). He has been married to Gail Sistrunk since 2012. He was previously married to Kate Harrington, Donna Dubrow and Carol Land."
        },
        Director: {
            Name: "Action",
            Bio: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres.",
            Birth: "1951"
        },
        ImageURL: "",
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
        ImageURL: "",
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
        ImageURL: "",
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
        ImageURL: "",
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
        ImageURL: "",
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
        ImageURL: "",
        Featured: true
    }
];

//Logging wth Morgan
app.use(morgan('common'));


//GET
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title == title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie');
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