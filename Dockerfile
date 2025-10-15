# ---------- Build Stage ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy file dependency
COPY package*.json ./

# Install dependency
RUN npm ci

# Copy semua source code
COPY . .

# Build Next.js app
RUN npm run build

# ---------- Run Stage ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy hasil build dari builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port default Next.js
EXPOSE 3000

# Jalankan aplikasi (hasil build)
CMD ["npm", "start"]
