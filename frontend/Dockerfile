FROM node:alpine3.16

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

WORKDIR /app/packages/examples/react-client

RUN npm install

WORKDIR /app

EXPOSE 3000

CMD npm run dev