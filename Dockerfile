# Build stage
FROM denoland/deno:2.6.8 AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY deno.json deno.lock ./

# Copy source files needed for build
COPY main.ts client.ts utils.ts vite.config.ts ./
COPY assets/ ./assets/
COPY components/ ./components/
COPY content/ ./content/
COPY data/ ./data/
COPY islands/ ./islands/
COPY lib/ ./lib/
COPY locales/ ./locales/
COPY resources/ ./resources/
COPY routes/ ./routes/
COPY static/ ./static/
COPY types/ ./types/

# Cache dependencies and build
RUN deno install
RUN deno task build

# Runtime stage
FROM denoland/deno:2.6.8

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/_fresh/ ./_fresh/

# Copy runtime files
COPY --from=builder /app/deno.json ./
COPY --from=builder /app/deno.lock ./
COPY --from=builder /app/static/ ./static/
COPY --from=builder /app/locales/ ./locales/
COPY --from=builder /app/content/ ./content/
COPY --from=builder /app/data/ ./data/
COPY --from=builder /app/resources/ ./resources/

EXPOSE 8000

CMD ["deno", "serve", "-A", "_fresh/server.js"]
