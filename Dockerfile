# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Default command: run all tests
CMD ["npx", "playwright", "test"] 