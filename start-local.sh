#!/bin/bash

set -e

cd go && go build && ./photolib&
cd -
cd react && yarn install
cd -
