FROM node:18-alpine
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build
 
CMD ["npm", "start"]
