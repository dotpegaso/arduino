// Initial state
let state = {
    red: 1, green: 1, blue: 1
  };

  // Map pins to digital inputs on the board
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 3,
      blue: 5
    }
  });

  // Helper function to set the colors
  let setStateColor = function(state) {
    led.color({
      red: state.red,
      blue: state.blue,
      green: state.green
    });
  };

  io.on('connection', function(client) {
    client.on('join', function(handshake) {
      console.log(handshake);
    });

    // Set initial state
    setStateColor(state);

    client.on('rgb', function(data) {
      state.red = data.color === 'red' ? data.value : state.red;
      state.green = data.color === 'green' ? data.value : state.green;
      state.blue = data.color === 'blue' ? data.value : state.blue;

      // Set the new colors
      setStateColor(state);

      client.emit('rgb', data);
      client.broadcast.emit('rgb', data);
    });

    // Turn on the RGB LED
    led.on();
  });