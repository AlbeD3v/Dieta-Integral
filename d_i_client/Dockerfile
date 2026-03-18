# Dev Dockerfile for d_i_client (Next.js)
FROM node:20-alpine

WORKDIR /app

# Prefer npm; harden against network issues and lack of lockfile
COPY package*.json ./
RUN npm set fund false \
 && npm set audit false \
 && npm set progress false \
 && npm set fetch-retries 5 \
 && npm set fetch-retry-maxtimeout 600000 \
 && npm config set registry https://registry.npmjs.org/ \
 && sh -c 'for i in 1 2 3; do \
      npm install --no-audit --no-fund --legacy-peer-deps && break || \
      (echo "npm install failed, retry $i/3" && sleep 5); \
    done'

# Copy the rest of the app (will be overridden by volume in compose for dev)
COPY . .

EXPOSE 3000

# Command is provided by docker-compose to run prisma migrate deploy and dev server
CMD ["npm","run","dev"]
