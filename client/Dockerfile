FROM node:18.19.0

# Create a client directory so that the .env file will be located in the correct directory
WORKDIR /client

# Copy over the package.json file
COPY package.json ./client

# Install the packages
RUN npm install
RUN npm install -g serve

# Copy over the rest of the files
COPY .env .
COPY . ./client

# Build the app
RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "serve"]