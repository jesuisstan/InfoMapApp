# Use the Node.js base image to build the backend and frontend
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./

# Copy the backend folder with its package.json and package-lock.json
COPY backend/package.json ./backend/

# Copy the frontend folder with its package.json and package-lock.json
COPY frontend/package.json ./frontend/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies
RUN cd frontend && npm install

# Install the concurrently package globally in the container
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Expose the ports for the backend and frontend
EXPOSE 9999 9000

# Start the backend and frontend using npm concurrently
CMD ["npm", "start"]
