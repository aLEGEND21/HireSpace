FROM node:18.19.0

# Copy over the package.json file
COPY package.json package-lock.json ./

# Install the packages
RUN npm install

# Copy over the rest of the files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3002

# Start the server
CMD ["npm", "run", "serve"]