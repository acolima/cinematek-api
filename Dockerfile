FROM node:15

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm i

CMD [ "npm", "run", "dev" ]