# pull official base image
FROM node:12-buster-slim

# set work directory
WORKDIR /home/root/web_app_tracker/frontend

# install dependencies
COPY package*.json ./
RUN npm install
COPY . .
