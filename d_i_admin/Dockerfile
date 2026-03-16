# Dev Dockerfile for d_i_admin (Next.js)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# Improve reliability on networks/proxy; retry npm install and avoid using npm ci
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

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
