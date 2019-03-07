#!/bin/bash

set -e

for i in {1..10}
do
	curl -X POST http://localhost:8081/photos -H 'Content-Type: application/json' -d '{"url":"https://placekitten.com/200/287", "title": "Test '$i'"}'
	curl -X POST http://localhost:8081/photos -H 'Content-Type: application/json' -d '{"url":"https://placekitten.com/220/285", "title": "B Test '$i'"}'
	curl -X POST http://localhost:8081/photos -H 'Content-Type: application/json' -d '{"url":"https://placekitten.com/210/200", "title": "C Test '$i'"}'
	curl -X POST http://localhost:8081/photos -H 'Content-Type: application/json' -d '{"url":"https://placekitten.com/300/210", "title": "Wide Test '$i'"}'
done
