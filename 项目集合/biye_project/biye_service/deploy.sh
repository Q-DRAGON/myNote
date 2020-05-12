#!/usr/bin/env bash

docker build -t biye_image .
# docker run -d -t -p 8563:8562 --name biye_proj_container biye_image
docker run -d -t -p 8563:8562 --name biye_proj_container -v /home/woyao/biye_service:/home/works/program/ --restart=always  biye_image
docker exec -it biye_proj_container bash

