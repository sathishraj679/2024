# Use official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install



# Copy all files from the host to the working directory
COPY ./src /usr/src/app

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]


