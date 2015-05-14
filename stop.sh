#!/bin/sh

PID_LOCATION='log/.pid'

if [ -f $PID_LOCATION ]; then
    PID=$(cat $PID_LOCATION)
    printf "\nAttempting to kill running server process PID=%i...\n" $PID
    
    if kill $PID > /dev/null 2>&1; then
        printf "Process PID=%i killed.\n\n" $PID
    else
        printf "Process PID=%i does not exist. Perhaps it has already died?\n\n" $PID
    fi

    rm $PID_LOCATION
else
    printf "\nThe server is not running. Please run './start.sh' to start the server.\n\n"
fi
