# README for Server Template scripts
This repository is designed to be a scaffolding for development of a NodeJS server, though it can really be adapted to work for any server. It's purpose is to provide a method of easily starting and stopping your server without always having to remember the commands to run the server, and to keep track of the PID it is running on for you.

### Running the server
To run a server, simply fill in the `server.js` file with your NodeJS server code, then enter `./start.sh` from the command line to run the server and get output about what is happening. If you already have an instance of the server running, the start script will alert you and give you the option to kill it, ignore it, or abort running a new server process.

The script will then provide you with the PID of the process your server is running in so that you may kill it yourself with `kill <PID>`. Another option is to use the stop script by entering `./stop.sh` from the command line. This will inform you of whether there is a server already running, and if there is it will kill it. Else, it will provide output accordingly.
