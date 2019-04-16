
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

const projectRoutes = require('./routes/project');



app.use("/", require("./routes/index"));

app.use("/about", require("./routes/about"));



app.use(mainRoutes);

app.use('/project', projectRoutes);

// handle error

app.use((req, res, next) => {

    const err = new Error(`Page not found!`);

    err.status = 404;

    console.error(err.message);

    return next(err);

});



app.use((err, req, res, next) => {

    res.locals.error = err;

    res.status(err.status);

    res.render('error', {

        err: err

    });

});

//listen on port 3000

app.listen(3000, () => {

    console.log(`The application is now running on localhost:3000!`);

});

