# Use the latest Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the port the app runs on (typically 3000 for development)
EXPOSE 5173

# Start the app in development mode
CMD ["npm", "run", "dev"]
