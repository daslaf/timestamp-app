// Require dependencies

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

// app.get('/', function(req, res) {

// 	res.send({
// 		unix: null,
// 		natural: null
// 	});

// });

app.get('/:query', function (req, res) {

	// response by default
	var response = {
		unix: null,
		natural: null
	};

	// get the url query
	var url = req.params.query;

	// if url is timestamp
	if ( isNumeric(url)) {
		
		response.unix = parseInt(url);

	} 
	// if url is natural datestring
	else if ( (new Date(url)).getTime() > 0 ) {

		response.unix = getTimeStamp(new Date(url));

	}

	response.natural = parseDateString(response.unix);
	
	res.send(response);

});


app.listen(port, function () {

  console.log('Timestamp microservice listening on port ' + port );

});



/****
*
*	Helpers
*
****/


var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// check if value is numeric
function isNumeric(num){
    return !isNaN(num)
}


// from timestamp to string
function parseDateString(timestamp) {

	if (!timestamp) return;

	var timezoneOffset = (new Date()).getTimezoneOffset()*60;

	var objDate = new Date((timestamp + timezoneOffset)*1000);


	
 	var month 	= monthNames[objDate.getMonth()], 
 		day 	= objDate.getDate(), 
		year 	= objDate.getFullYear();

	return (month + " " + day + ", " + year);
}


// from date to timestamp
function getTimeStamp(objDate) {

	if (!objDate) return;

	return objDate.getTime()/1000 - objDate.getTimezoneOffset()*60;
}
