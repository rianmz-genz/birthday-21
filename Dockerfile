# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (gunakan 'npm ci' untuk install yang bersih & cepat sesuai lockfile)
RUN npm ci

# Stage 2: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Matikan telemetry Next.js saat build (opsional)
ENV NEXT_TELEMETRY_DISABLED 1

# Build project
RUN npm run build

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy file public (aset statis seperti gambar, favicon)
COPY --from=builder /app/public ./public

# Copy hasil build standalone
# Folder .next/standalone otomatis dibuat oleh Next.js karena config di Langkah 1
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set user ke non-root
USER nextjs

# Expose port
EXPOSE 3000

# Pastikan hostname diset ke 0.0.0.0 agar bisa diakses dari luar container
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Jalankan server
CMD ["node", "server.js"]