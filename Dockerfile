FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

RUN npm build

CMD ["npm", "start"]

