FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000
HOST 0.0.0.0

RUN npm build

CMD ["npm", "start"]

