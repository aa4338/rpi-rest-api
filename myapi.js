/**
 * myapi.js
 *
 * @version 1.1 - April 2015
 *
 *
 * DESCRIPTION:
 * an application to demonstrate running a node
 * API Appserver on a Raspberry Pi to access GPIO I/O
 * Uses the Express and wiringPi node packages.
 *
 *
 * @throws none
 * @see nodejs.org
 * @see express.org
 *
 * @author Ceeb
 * (C) 2015 PINK PELICAN NZ LTD
 */

var http      = require('http');
var express   = require('express');
var gpio      = require('pi-gpio');

var app       = express();

//var val = [['0'],['0'],['0'],['0'],['0']]; //stores values

// input port objects for our example
var inputs = [    { pin: '37', gpio: '26', value: null },
                  { pin: '38', gpio: '20', value: null },
		  { pin: '35', gpio: '19', value: null },
		  { pin: '36', gpio: '16', value: null },
		  { pin: '11', gpio: '17', value: null },
		  { pin: '13', gpio: '27', value: null },
                ];



// -----------------------------------------------------------------------
// open GPIO ports
var i;
for (i in inputs) {
  console.log('opening GPIO port ' + inputs[i].gpio + ' on pin ' + inputs[i].pin + ' as input');
  gpio.open(inputs[i].pin, "input", function (err) {
    if (err) {
      throw err;
    }
  }); // gpio.open
} // if




// ------------------------------------------------------------------------
// read and store the GPIO inputs twice a second
setInterval( function () {

  gpio.read(inputs[0].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[0].pin + ' value = ' + value);
    // update the inputs object
    inputs[0].value = value.toString(); // store value as a string
  });

  gpio.read(inputs[1].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[1].pin + ' value = ' + value);
    inputs[1].value = value.toString();
  });
  gpio.read(inputs[2].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[2].pin + ' value = ' + value);
    // update the inputs object
    inputs[2].value = value.toString(); // store value as a string
  });

  gpio.read(inputs[3].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[3].pin + ' value = ' + value);
    inputs[3].value = value.toString();
  });
  gpio.read(inputs[4].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[4].pin + ' value = ' + value);
    // update the inputs object
    inputs[4].value = value.toString(); // store value as a string
  });

  gpio.read(inputs[5].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[5].pin + ' value = ' + value);
    inputs[5].value = value.toString();
  });
//GET THE BELOW CODE TO WORK//-------------------------
  // for (i=0;i < inputs.length;i++) {
  //   gpio.read(inputs[i].pin, function (err, value){
	//     if (err) {
	// 	    throw err;
	//     }
	//     console.log('read pin ' + inputs[i].pin + 'value = ' + value);
	//     //update the inputs object
	//     inputs[i].value = value.toString();
//---------------------------------------------------------

    //});

  var rala_list = [[inputs[0].value],[inputs[1].value],[inputs[2].value],[inputs[3].value]];

  var sp4t_list = [[inputs[4].value],[inputs[5].value]];



  var rala_states = [[rala_list[0].val, 'State 1'], [rala_list[1].val, 'State 2'], [rala_list[2].val, 'State 3'], [rala_list[3].val, 'State 4']];
  var sp4t_states = [[sp4t_list[0].val, 'RF 2 - Omnidirectional Antenna'], [rala_list[1].val, 'RF 3 - DYSE']];
  var rala_map = new Map(rala_states);
  var sp4t_map = new Map(sp4t_states);

  sp4t_map.get(sp4t_list[0].val)

  if ((sp4t_list[0].val == '1') && (sp4t_list[1].val == '1')){
  	console.log(sp4t_map.get(sp4t_list[0].val));
  	if ((rala_list[0] == '1') && (rala_list[3] == '1')){
  		console.log('State 0 - Omni');
  	} else {
  		for(var key in rala_states) {
  			var value = rala_states[key];
  			if(key == '1'){
  				console.log(value);
  			} else {
  				console.log('No direction specified');
  			};
  		};
  	};
  } else {
  	for(var key in sp4t_states) {
  		var value = sp4t_states[key];
  		if(key == '1'){
  			console.log(value);
  		} else {
  			console.log('RF 4 - RF Matrix');
  		};
  	};
  };


},500);


// --------------------------
// DO STATE CALCULATIONS AFTER VALUE OF PINS ARE SET
// -------------------------- Mapping: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

// for (i=0;i<6;i++){
//   gpio.read(inputs[i].pin, function (err, value){
//     if (err) {
//       throw err;
//     }
//     //console.log('read pin ' + inputs[i].pin + 'value = ' + value);
//     //update the inputs object
//     //inputs[i].value = value.toString();
//     val[i] = parseInt(value);
// });
// };


// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  var i;

  console.log('received API request for port number ' + req.params.id);

  for (i in inputs){
    if ((req.params.id === inputs[i].gpio)) {
      // send to client an inputs object as a JSON string
      res.send(inputs[i]);
      return;
    }
  } // for

  console.log('invalid input port');
  res.status(403).send('dont recognise that input port number ' + req.params.id);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send array of inputs objects as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

process.on('SIGINT', function() {
  var i;

  console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");

  console.log("closing GPIO...");
  for (i in inputs) {
    gpio.close(inputs[i].pin);
  }
  process.exit();
});

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');
