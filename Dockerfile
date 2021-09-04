FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080 5000

RUN npm build

CMD ["npm", "start"]

