# Use an official Node.js image for building the app
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy source and build
COPY . .
RUN bun run build

# Use nginx to serve the built files
FROM nginx:stable-alpine AS production

# Override default nginx config with SPA-friendly configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
