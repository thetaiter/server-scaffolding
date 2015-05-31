# Server Scaffolding
This repository is designed to be a scaffolding for development and production of any type of NodeJS server. Grunt was
chosen as the default task runner.

## Running the server
### Before your first run
Before running your server, you must install the dependencies that are required using NPM, the NodeJS Package Manager. 
With NodeJS installed on your computer, run `npm install` from the root directory of the repository (the same directory 
as this README file). This will install all dependencies, including developer dependencies, that are defined in the 
`package.json` file. If you are preparing this server for production, and do not need the developer dependencies, you 
can run `npm install --production` or set the 'NODE_ENV' environment variable equal to 'production' before running 
`npm install`.

### Running your server (development only)

To run your server, simply add your code to the `server.js` file, or replace it with your own file (make sure it is 
named `server.js`) and run `grunt run` to run the server, sending stderr and stdout to the terminal. To stop the server, 
send the SIGINT (`Ctrl-C`), SIGQUIT (`Ctrl-\`), or SIGTERM (`kill <pid>`) signal to the process. Try to refrain from 
using `kill -9 <pid>`, because that sends the SIGKILL signal, which cannot be caught or handled by any process. If you 
do choose to use that, the server may not shut down properly.

### Running in the background (development only)

If you would like to run your server in the background and still keep track of output/errors, run 
`grunt forever:server:start`. This will run your server in the background and create a `logs` directory in the root 
directory of this repository, logging stdout and stderr to files in this directory. Run `grunt forever:server:stop` to 
stop the server, or `grunt forever:server:restart` to restart it. You can also run `grunt forever::<command>`, replacing 
'<command>' with start, stop, or restart. However this can cause problems if you add additional servers to grunt-forever, 
as it will start, stop, or restart all of the running servers. 