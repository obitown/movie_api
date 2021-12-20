const express = require('express'),
    morgan = require('morgan');

const app = express();
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
        title:'The Room',
        year: '2003',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Superbad',
        year: '2007',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Shaun of the Dead',
        year: '2004',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: '28 Days Later...',
        year: '2002',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Die Hard',
        year: '1988',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Saving Private Ryan',
        year: '1998',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: '1983',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Pacific Rim: Uprising',
        year: '2018',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Spider-Man',
        year: '2002',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
        }
    },
    {
        title: 'Midsommer',
        year: '2019',
        genre: '',
        director: {
            name: '',
            birth: '',
            death: ''
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
    res.json(movies);
});

app.get('/movies/:title', (req, res) => {
    res.status(200).json(movies.find((movie) =>{
        return movie.title === req.params.title
    }));
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