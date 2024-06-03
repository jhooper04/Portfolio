FROM node:lts-alpine
RUN npm install -g npm@latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node

RUN mkdir -p /usr/src/app/dist/out

CMD ["npm", "run", "build"]
