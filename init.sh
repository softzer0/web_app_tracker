#!/bin/bash
./start.sh
./setup-email.sh email add noreply@trackway.cloud xHqvQ8wq6t3Y
./setup-email.sh config dkim
docker-compose -f docker-compose.prod.yml restart mail
docker-compose -f docker-compose.prod.yml exec backend python3 manage.py loaddata fixtures.json
