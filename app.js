
// require data.json

const express = require('express');

const data = require('./data.json');

const app = express();

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const projects = data.projects;

var port = process.env.PORT || 3000;

// Init Parsing of Req Body & Cookies

app.use(bodyParser.urlencoded({

    extended: false

}));

app.use(cookieParser());



app.use('/static', express.static('public'));



app.set('view engine', 'pug');



app.get ('/', (req, res) => {

    

res.render('index', { projects });

});



app.get ('/about', (req, res) => {

    res.render('about', {projects});

});



app.get('/project', (req, res) => {

     res.render('project', {projects});

});

// get and dynamically render project layout based on clicked project image in index page

app.get ('/project/:id', (req, res) => {

    const {id} = req.params;

    if( isNaN(id) || id >= projects.length) {

      return  res.redirect('/');

    }

    res.render('project', {id, projects});

});

//listen on port 3000

app.listen(3000, () => {

    console.log(`The application is now running on localhost:3000!`);

});

