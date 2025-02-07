FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY prisma ./prisma/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]