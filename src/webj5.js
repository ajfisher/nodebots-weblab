import hrtime from 'browser-process-hrtime';
process.hrtime = hrtime;

import { EventEmitter } from 'events';
import firmataio from 'firmata-io';
import j5 from 'johnny-five';
import SerialPort from './browser-serialport.js';

const { Firmata } = firmataio;

j5.firmata = Firmata;
j5.serial = SerialPort;
j5.events = new EventEmitter();
j5.port = undefined;

j5.runSerial = function (button, opts = {}) {
  button.addEventListener("click", async (evt) => {
    console.log("Authorising");
    const serial = new j5.serial(opts);
    j5.port = serial;
    // emit the serial object.
    j5.events.emit('serial', serial);
  }, false);
};

j5.close = async function() {
  console.log('Closing connection');
  await j5.port.close();
  location.reload();
};


export default j5;
