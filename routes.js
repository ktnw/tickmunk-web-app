const express = require('express');
const router  = express.Router();
const request = require('request');

router

// index - get all records
.get('/', (req, res) => {
    /*
    request('http://localhost:8000/api/v1/puppies/', { json: true }, (err, apiResponse, body) => {
    	if (err) { return console.log(err); }
    	const puppies = body.puppies;

        res.render('index', {
            puppies: puppies,
        });
	});
*/

        const tasks = [{ 'from_date' : '7/27/2018', 'to_date' : '7/28/2018', 'description' : 'Find the lost puppy' },
                       { 'from_date' : '7/28/2018', 'to_date' : '7/29/2018', 'description' : 'Another task' }
                    ];

        res.render('index', {
            tasks: tasks,
        });
})

// new - form to create new record
.get('/new', (req, res) => {
    res.render('new');
})

// create - call to API to create new record
.post('/create', (req, res) => {
	const formData = req.body;
	request.post({url:'http://localhost:8000/api/v1/puppies/', form: formData}, function(err,apiResponse,body){
    	if (err) { return console.log(err); }
    	console.log(apiResponse.statusCode + " " + apiResponse.statusMessage);
        res.redirect('/');
	});
})

// edit - form to edit current record
.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	
    request('http://localhost:8000/api/v1/puppies/' + id, { json: true }, (err, apiResponse, body) => {
    	if (err) { return console.log(err); }
    	const puppy = body.puppy;

        res.render('edit', {
            puppy: puppy,
        });
	});
})

// save - call to API to save edited record
.post('/save', (req, res) => {
	const id = req.body.id;
	const formData = req.body;
	request.put({url:'http://localhost:8000/api/v1/puppies/' + id, form: formData}, function(err,apiResponse,body){
    	if (err) { return console.log(err); }
    	console.log(apiResponse.statusCode + " " + apiResponse.statusMessage);
        res.redirect('/');
	});
})

// delete
.get('/delete/:id', (req, res) => {
	const id = req.params.id;
	
    request.delete('http://localhost:8000/api/v1/puppies/' + id, { json: true }, (err, apiResponse, body) => {
    	if (err) { return console.log(err); }
    	console.log(apiResponse.statusCode + " " + apiResponse.statusMessage);
        res.redirect('/');
	});
})

module.exports = router;