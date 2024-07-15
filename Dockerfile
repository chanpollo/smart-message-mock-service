FROM node:20.15-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.15-alpine AS modules
WORKDIR /app
COPY package.json ./
RUN npm install --production

FROM node:20.15-alpine
WORKDIR /app
COPY --from=modules /app/package.json ./
COPY --from=modules /app/node_modules ./node_modules/
COPY --from=builder /app/dist ./dist/
EXPOSE 3000

CMD ["npm", "start"]
