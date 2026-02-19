FROM node:18-alpine

WORKDIR /app

# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
