
// require data.json

const express = require('express');

const data = require('./data.json');

const app = express();

const projects = data.projects;

var port = process.env.PORT || 3000;





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

