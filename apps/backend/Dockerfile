FROM node:18-alpine 

# Create app directory
WORKDIR /usr/src/app

COPY /dist/apps/backend .

RUN npm install -g pnpm
RUN pnpm install --prod

ENV NODE_ENV production

CMD node ./main.js

