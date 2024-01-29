FROM node:16.20.0

WORKDIR /code

COPY package*.json /code

RUN npm install

COPY ./ /code/
EXPOSE 9000
RUN npm run build
ENTRYPOINT [ "/bin/bash", "/code/entrypoint.sh" ]
CMD ["npm", "run" , "start:prod"]
