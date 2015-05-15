#!/bin/sh

RUN_SCRIPT='node server.js'
LOG_LOCATION='log'
PORT=3000

if [ $# -eq 0 ]
then
    printf "\nNo port specified Using default port (%s).\n" $PORT
elif [ "$#" -eq 2 -a \( "$1" = "-p" -o "$1" = "--port" \) ]
then
    PORT=$2
else
    printf "\nUsage:\n\n    Optional Arguments:\n\t-p, --port\tSpecify port number\n\n"
    exit 1
fi
    

cd $(dirname $0)

if ! [ -d "$LOG_LOCATION" ]
then
    mkdir -p $LOG_LOCATION
fi

if [ -f $LOG_LOCATION/.pid ]
then
    PID=$(cat $LOG_LOCATION/.pid)

    printf "\nAn instance of your server is already running (PID=%s)." $PID
    printf "\n\nWhat would you like to do?\n"
    printf "\n\tKill   - Attempt to kill the currently running server before starting a new instance"
    printf "\n\tIgnore - Ignore the currently running server and start a new instance on a different port"
    printf "\n\tAbort  - Do nothing"
    printf "\n\nAll information for the currently running server will be lost if you do not abort."
    printf "\n\n(Kill/Ignore/Abort) [Abort]: "

    read answer

    if [ "$answer" = "K" ] || [ "$answer" = "k" ] || [ "$answer" = "Kill" ] || [ "$answer" = "kill" ]
    then
        ./stop.sh
    elif [ "$answer" = "I" ] || [ "$answer" = "i" ] || [ "$answer" = "Ignore" ] || [ "$answer" = "ignore" ]
    then
        printf "\nIgnoring currently running server process.\n"
        printf "\nWhat port would you like to run the new instance on? []"
    else
        printf "\nAborting.\n\n"
        exit 3
    fi
else
    echo
fi

printf "Attempting to run '%s'...\n" "$RUN_SCRIPT"

nohup $RUN_SCRIPT 2> $LOG_LOCATION/error.log > $LOG_LOCATION/server.log &
PID=$!
echo $PID > $LOG_LOCATION/.pid

printf "Server started, PID = %s.\nLogging stdout and stderr to files in '%s' folder.\n\n" $PID $LOG_LOCATION
