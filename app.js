const express = require('express');
const pathFile = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Load routes
const ideasRoute = require('./routes/ideas');
const usersRoute = require('./routes/users');

const port = 3000;

// In order to launch - mongod --config /usr/local/etc/mongod.conf

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose 
mongoose.connect('mongodb://localhost/vidjot', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB error - ' + err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayour: 'main'
}));
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Static folder
app.use(express.static(pathFile.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
    res.render('INDEX');
});

// app.get("*", function(req,res){
//     res.send("Error: No such page!");
// });


// Use routes
app.use('/ideas', ideasRoute);
app.use('/users', usersRoute);


app.listen(port, () => {
    console.log('Server started on port ' + port);
})

