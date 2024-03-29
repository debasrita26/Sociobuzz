const express = require('express');
const app = express(); 
const port = 8222;
const env=require('./config/environment');
const logger=require('morgan'); 
 
require('./config/view-helpers')(app);   
const path=require('path');  

const cookieParser = require('cookie-parser');  
const session = require('express-session');
const passport = require('passport');       
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const PassportGoogle=require('./config/passport-google-oauth2-strategy');


const db = require('./config/mongoose');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');  

const sassMiddleware =require('node-sass-middleware'); 
const flash=require('connect-flash');
const mware=require('./config/middleware');

//chat server
const chatServer=require("http").Server(app); 
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000'); 
  
if(env.name=='development'){
app.use(sassMiddleware({     
    src: path.join(__dirname,env.asset_path,'scss'),  
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
  }));      
}            
    
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static('./public/assets'));
// app.use(express.static(__dirname + '/public'));
//make the uploads path available for the server
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
  
//app.use(logger(env.morgan.mode,env.morgan.options));
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine   
app.set('view engine', 'ejs');
app.set('views', './views');
        
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: "YXhW0OlhLCHD3j2jFRRP0t1ZUoqffshf",
<<<<<<< HEAD
    //env.session_cookie_key,
=======
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
    saveUninitialized: false,
    resave: false,
    cookie: { 
        maxAge: (1000 * 60 * 100) 
    },
<<<<<<< HEAD
    ///store: MongoStore.create({mongoUrl:"mongodb+srv://debasrita:Mongodb12345@cluster0.88isc.mongodb.net/socialmedia_db"})

     store: new MongoStore(
=======
    // store: MongoStore.create({mongoUrl:"mongodb+srv://debasrita:Mongodb12345@cluster0.88isc.mongodb.net/socialmedia_db"})
    store: new MongoStore(
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
         { 
             mongooseConnection: db,
             autoRemove: 'disabled'
         
<<<<<<< HEAD
         }, 
=======
         },
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
         function(err){
             console.log(err ||  'connect-mongodb setup ok');
         }
    )
}));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
    
app.use(flash());
app.use(mware.setFlash);

// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    } 

    console.log(`Server is running on port: ${port}`);
});