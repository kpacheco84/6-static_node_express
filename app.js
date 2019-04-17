
const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');



const { projects } = require("./data.json");



const app = express();



// Init Parsing of Req Body & Cookies

app.use(bodyParser.urlencoded({

    extended: false

}));

app.use(cookieParser());



app.use('/static', express.static('public'))



// Setup view engine to Pug

app.set('view engine', 'pug');


// setup routes
const mainRoutes = require('./routes');

const projectRoutes = require('./routes/projects');



app.use("/", require("./routes/index"));

app.use("/about", require("./routes/about"));



app.use(mainRoutes);

app.use('/project', projectRoutes);

// handle error not working

app.use(function(req, res, next)  {

    const error = new Error("Page is Not Found");

    error.status = 404;

    console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);

    next(error);

});



// Tell our application we want to display an error page if an error occurs

app.use((error, req, res, next) => {

    res.locals.error = error;

    res.status(error.status || 500);

    res.render('error');

});

//listen on port 3000

app.listen(3000, () => {

    console.log(`The application is now running on localhost:3000!`);

});

