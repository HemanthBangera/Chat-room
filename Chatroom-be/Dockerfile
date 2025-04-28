# Use official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port your app will run on (example: 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
