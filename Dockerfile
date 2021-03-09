# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:10.15.3-alpine

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/node/app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g pm2

# Copy source files from host computer to the container
COPY . ./

# Build the app
# RUN npm run build

# Specify port app runs on
EXPOSE 3000
EXPOSE 9200

# Run the app
# CMD [ "npm", "start" ]
CMD npm run start




