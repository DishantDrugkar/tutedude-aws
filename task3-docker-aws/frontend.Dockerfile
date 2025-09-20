# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY express-frontend/package*.json ./
RUN npm install

# Copy source code
COPY express-frontend/ .

# Expose Express port
EXPOSE 3000

# Run Express
CMD ["node", "index.js"]