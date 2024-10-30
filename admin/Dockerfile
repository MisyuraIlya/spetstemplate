# Use latest Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Install dependencies in a separate layer
COPY package.json package-lock.json* ./ 
RUN npm install --force

# Copy all files to the working directory
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
