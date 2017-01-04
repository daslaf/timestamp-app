// Require dependencies

var express = require('express');
var app = express();

app.get('/:query', function (req, res) {

	// get the url query
	var url = req.params.query;
	
	// response by default
	var response = {
		unix: null,
		natural: null
	};


	// full name of months
	
	// if url is timestamp
	if ( isNumeric(url)) {
		
		response.unix = parseInt(url);

		var objDate = new Date(parseInt(url));

		response.natural = parseDateString(objDate);

		res.send(response);
	} 
	// if url is natural datestring
	else if ( (new Date(url)).getTime() > 0 ) {
		response.unix = (new Date(url)).getTime();
		response.natural = url.split("%20").join(" ");

		res.send(response);
	}
	// if is invalid or whatever
	else {
		res.send(response);
	}
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// check if value is numeric
function isNumeric(num){
    return !isNaN(num)
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// parse data to string
function parseDateString(objDate) {

	console.log(objDate);
	
 	var month = monthNames[objDate.getMonth()];
	var day = objDate.getDate();
	var year = objDate.getFullYear();

	return (month + " " + day + ", " + year);
}
