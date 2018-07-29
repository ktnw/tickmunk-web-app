const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

// set up router
app.use('/', routes);
//app.use('/users', users);


app.use('*',function(req, res){
  res.status(404).send('Page Not Found!');
});

const PORT = process.env.PORT || 8080

app.listen(PORT, function() {
  console.log('listening on ' + PORT)
})

module.exports = app;