# Server Scaffolding
This repository is designed to be a scaffolding for development and production of any type of NodeJS server. Grunt was
chosen as the default task runner.

## Installation and setup

First, clone this repository with `git clone http://github.com/thetaiter/server-scaffolding` or fork it on GitHub. 

Then, run `npm install` from the root directory of the repository. This will install all dependencies, including developer dependencies, that are defined in the `package.json` file. 

NOTE: If you are preparing this server for production, and do not need the developer dependencies, you can run `npm install --production` or set the 'NODE_ENV' environment variable equal to 'production' before running `npm install`.

If you are using your own git repository, or contributing to this one, you can add the jshint and nodeunit grunt tasks as git pre-commit hooks by running `grunt githooks`. This is highly recommended, as it will enforce good code styling and habits, and make sure that all your tests get run before committing your code.

## Running the server
### Running your server (development only)

To run your server, simply add your code to the `server.js` file, or replace it with your own file (make sure it is named `server.js`) and run `grunt run` to run the server, sending stderr and stdout to the terminal. If you replace it with your own file, make sure you export the server and port variables as in the `server.js` file provided. To stop the server, send the SIGINT (`Ctrl-C`), SIGQUIT (`Ctrl-\`), or SIGTERM (`kill <pid>`) signal to the process. Try to refrain from using `kill -9 <pid>`, because that sends the SIGKILL signal, which cannot be caught or handled by any process. If you do choose to use that, the server may not shut down properly.

### Running in the background (development only)

If you would like to run your server in the background and still keep track of output/errors, run `grunt forever`. This will run your server in the background and create a `logs` directory in the root directory of this repository, logging stdout and stderr to files in this directory. Run `grunt forever::stop` to stop the server, or `grunt forever::restart` to restart it. You can also run `grunt forever::<command>`, replacing 
'<command>' with start, stop, or restart. However this can cause problems if you add additional servers to grunt-forever, as it will start, stop, or restart all of the running servers. For more information about forever, check out the GitHub repo [here](https://github.com/bustardcelly/grunt-forever).
