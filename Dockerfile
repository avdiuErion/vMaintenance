FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]