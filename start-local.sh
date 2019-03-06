#!/bin/bash

set -e

cd go && go build && ./photolib &
cd react && yarn install && npm start

sleep 1
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

