# ==========================================
# STAGE 1: Install all dependencies (including devDependencies)
# ==========================================
FROM node:18-alpine AS deps
WORKDIR /usr/src/app

# Copy package manifests
COPY package*.json ./

# Install ALL dependencies (needed for compilation/TypeScript)
RUN npm install

# ==========================================
# STAGE 2: Build / Compile the TypeScript application
# ==========================================
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Bring over the installed node_modules from Stage 1
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the rest of your backend source code
COPY . .

# Compile TypeScript to JavaScript (typically outputs to a /dist directory)
RUN npm run build

# Prune devDependencies to keep the production layer clean
# (Optional but recommended for strict production standards)
RUN npm prune --production

# ==========================================
# STAGE 3: Final lean Production runtime image
# ==========================================
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Create a secure, non-root system user and group for safety
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the necessary runtime files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Switch ownership of the working directory to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Run the container under the secure non-root user
USER appuser

# Expose the port your backend listens to (Change 5000 if your server uses 8080, 4000, etc.)
EXPOSE 8000
ENV PORT=8000

# Execute the compiled production entry point
CMD ["node", "dist/index.js"]