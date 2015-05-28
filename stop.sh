#!/bin/sh

LOG_LOCATION='log'

cd $(dirname $0)

if [ -f $LOG_LOCATION/.pid ]; then
    PID=$(cat $LOG_LOCATION/.pid)
    
    if kill -9 $PID > /dev/null 2>&1
    then
        printf "\nProcess with PID = %i was killed.\n\n" $PID
    else
        printf "\nProcess with PID = %i does not exist. Perhaps it has already died?\n\n" $PID
    fi

    rm $LOG_LOCATION/.pid
    rm $LOG_LOCATION/.port
else
    printf "\nThe server is not running. Please run './start.sh' to start the server.\n\n"
fi
