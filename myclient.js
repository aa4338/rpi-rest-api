/**
 * MYCLIENT.JS
 * an example web app using an ajax request to our API server which returns a JSON object
 *
 * When a user opens index.html it then loads and executes this JavaScript code, which reads
 * the current logic level on the input ports, and displays that in the window, each in a div
 * identified by the index "inputs_[port number]"
 */

window.onload = function () {
  var url,
    i,
    ports = [26, 20, 19, 16, 17, 27];  // the GPIO ports we will read

  for (i in ports) {
    $('#input_' + ports[i]).html('loading port ' + ports[i] + ' value...');
  }

  setInterval( function () {
    for (i in ports) {
      url = document.URL + 'inputs/' + ports[i];
      console.log('making API call ' + url);

      $.getJSON(url, function (data) {
        console.log('API response received. port ' + data.gpio + ' value = ' + data.value);
        $('#input_' + data.gpio).html('GPIO input port ' + data.gpio + ' value is ' + data.value);
        var data_array = [0,0,0,0,0,0];//DEFINES ARRAY
        data_array[i] = data.gpio; //NEW// puts values into array
        // ///////////////////////-----------EXPERIMENTAL//////////////////
        // var rala_list = [data_array[0], data_array[1], data_array[2], data_array[3]];
        //
        // var sp4t_list = [data_array[4], data_array[5]];
        //
        //
        //
        // var rala_states = [[rala_list[0].val, 'State 1'], [rala_list[1].val, 'State 2'], [rala_list[2].val, 'State 3'], [rala_list[3].val, 'State 4']];
        // var sp4t_states = [[sp4t_list[0].val, 'RF 2 - Omnidirectional Antenna'], [rala_list[1].val, 'RF 3 - DYSE']];
        // var rala_map = new Map(rala_states);
        // var sp4t_map = new Map(sp4t_states);
        //
        // sp4t_map.get(sp4t_list[0].val)
        // ////////////////
        // if ((sp4t_list[0].val == '1') && (sp4t_list[1].val == '1')){
        //   $('#input_' + data.gpio).html('State of Antenna: ' + sp4t_map.get(sp4t_list[0].val));
        //   //console.log(sp4t_map.get(sp4t_list[0].val));
        //   if ((rala_list[0] == '1') && (rala_list[3] == '1')){
        //     $('#input_' + data.gpio).html('State of Antenna: State 0 Omni');
        //     //console.log('State 0 - Omni');
        //   } else {
        //     for(var key in rala_states) {
        //       var value = rala_states[key];
        //       if(key == '1'){
        //         $('#input_' + data.gpio).html('State of Antenna: ' + value);
        //         //console.log(value);
        //       } else {
        //         $('#input_' + data.gpio).html('No direction specified');
        //         //console.log('No direction specified');
        //       };
        //     };
        //   };
        // } else {
        //   for(var key in sp4t_states) {
        //     var value = sp4t_states[key];
        //     if(key == '1'){
        //       $('#input_' + data.gpio).html('State of Antenna: ' + value);
        //       // console.log(value);
        //     } else {
        //       $('#input_' + data.gpio).html('State of Antenna: RF 4 - RF Matrix');
        //       //console.log('RF 4 - RF Matrix');
        //     };
        //   };
        // };
        // //----------------------------END-------------------
      });
    } // for 26, 20, 19, 16, 17, 27

  }, 1000); // setInterval

}; //onload
