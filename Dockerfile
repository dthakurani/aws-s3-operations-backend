FROM node:16.20.0

WORKDIR /code

COPY package*.json /code

RUN npm install

COPY ./ /code/
EXPOSE 9000
CMD ["npm", "run", "start:prod"]
