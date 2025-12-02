# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.cjs ./

# Build frontend
RUN npm run build

# Stage 2: Build final image with backend
FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install backend dependencies (production only)
RUN npm install --production

# Copy backend server code
COPY server.js .
COPY data.json .

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/frontend/dist ./dist

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run the application
CMD ["npm", "start"]
