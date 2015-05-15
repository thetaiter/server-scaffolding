#!/bin/sh

LOG_LOCATION='log'

cd $(dirname $0)

if [ -f $LOG_LOCATION/.pid ]; then
    PID=$(cat $LOG_LOCATION/.pid)
    printf "\nAttempting to kill running server process PID=%i...\n" $PID
    
    if kill -9 $PID > /dev/null 2>&1; then
        printf "Process PID=%i killed.\n\n" $PID
    else
        printf "Process PID=%i does not exist. Perhaps it has already died?\n\n" $PID
    fi

    rm $LOG_LOCATION/.pid
else
    printf "\nThe server is not running. Please run './start.sh' to start the server.\n\n"
fi
