const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require ('express-session');
const passport = require('passport');

//Inicializations
const app= express();
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4445);
app.set('views',path.join(__dirname , 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') , 'layouts'),
    partialsDir:path.join(app.get('views') , 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({extend:false}));
app.use(methodOverride('_method'));
app.use (session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
app.use(require('./routes/indexRoutes'));
app.use(require('./routes/notesRoutes'));
app.use(require('./routes/users.Routes.js'))

//GlobalVariables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.userss = req.userss || null;
    next();
});

//StaticFiles
app.use(express.static(path.join(__dirname , 'public')))

module.exports = app;