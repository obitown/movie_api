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
        Title: '',
        Description: '',
        Genre: {
            Name: '',
            Description: ''
        },
        Director: {
            Name: '',
            Bio: '',
            Birth: ''
        },
        ImageURL: '',
        Featured: true
    },

    {
        title:'The Room',
        year: '2003',
        genre: 'Drama',
        director: {
            name: 'Tommy Wiseau',
            birth: 'October 3, 1995',
            death: 'Still alive'
        }
    },
    {
        title: 'Superbad',
        year: '2007',
        genre: 'Comedy',
        director: {
            name: 'Greg Mottola',
            birth: 'July 11, 1964',
            death: 'Still alive'
        }
    },
    {
        title: 'Shaun of the Dead',
        year: '2004',
        genre: 'Comedy',
        director: {
            name: 'Edgar Wright',
            birth: 'April 18, 1974',
            death: 'Still alive'
        }
    },
    {
        title: '28 Days Later...',
        year: '2002',
        genre: 'Horror',
        director: {
            name: 'Danny Boyle',
            birth: 'October 20, 1956',
            death: 'Still alive'
        }
    },
    {
        title: 'Die Hard',
        year: '1988',
        genre: 'Action',
        director: {
            name: 'John McTiernan',
            birth: 'January 8, 1951',
            death: 'Still alive'
        }
    },
    {
        title: 'Saving Private Ryan',
        year: '1998',
        genre: 'Drama',
        director: {
            name: 'Steven Spielberg',
            birth: 'December 18, 1946',
            death: 'Still alive'
        }
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: '1983',
        genre: 'Action',
        director: {
            name: 'Richard Marquand',
            birth: 'September 22, 1937',
            death: 'September 4, 1987'
        }
    },
    {
        title: 'Pacific Rim: Uprising',
        year: '2018',
        genre: 'Action',
        director: {
            name: 'Steven S. DeKnight',
            birth: 'April 8, 1964',
            death: 'Still alive'
        }
    },
    {
        title: 'Spider-Man',
        year: '2002',
        genre: 'Action',
        director: {
            name: 'Sam Raimi',
            birth: 'October 23, 1959',
            death: 'Still alive'
        }
    },
    {
        title: 'Midsommer',
        year: '2019',
        genre: 'Drama',
        director: {
            name: 'Ari Aster',
            birth: 'July 15, 1986',
            death: 'Still alive'
        }
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