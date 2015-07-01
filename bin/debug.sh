#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

export DEBUG=app:*
node "${DIR}"/www.js
