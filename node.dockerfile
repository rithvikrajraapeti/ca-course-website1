# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the Node.js server
CMD ["node", "src/index.js"]