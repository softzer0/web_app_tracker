#!/bin/bash
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml exec backend python3 manage.py collectstatic --noinput
docker-compose -f docker-compose.prod.yml exec backend python3 manage.py migrate --noinput
#docker-compose -f docker-compose.prod.yml exec backend python3 manage.py loaddata fixtures.json

