#!/bin/bash

echo hello What should the verson be?
read  VERSION

docker build -t iamsmore/reddit:$VERSION .
docker push iamsmore/reddit:$VERSION
ssh root@64.227.5.139 "docker pull iamsmore/reddit:$VERSION && docker tag iamsmore/reddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"