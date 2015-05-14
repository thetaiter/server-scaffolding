#!/bin/sh

RUN_SCRIPT='node server.js'
LOG_LOCATION='log'
KILLED=false

if [ -f $LOG_LOCATION/.pid ]; then
    PID=$(cat log/.pid)

    printf "\nThere is already a server running with PID=%i.\nWould you like to kill this process before running a new process?\nAll logging information for the current process will be lost regardless. (Y/N): " $PID

    read answer

    if [ "$answer" = "Y" ] || [ "$answer" = "y" ] || [ "$answer" = "yes" ] || [ "$answer" = "Yes" ]; then
        ./stop.sh
        KILLED=true
    else
        printf "\nIgnoring currently running server process.\n"
    fi
fi

if [ "$KILLED" = false ]; then
    echo
fi

printf "Attempting to run '%s'...\n" "$RUN_SCRIPT"

nohup $RUN_SCRIPT 2> $LOG_LOCATION/error.log > $LOG_LOCATION/server.log &
PID=$!
echo $PID > $LOG_LOCATION/.pid

printf "Process started, PID = %i.\nLogging stdout and stderr to files in '%s' folder.\n\n" $PID $LOG_LOCATION
