FROM node:lts-alpine
RUN npm install -g npm@latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app

RUN mkdir -p /usr/src/app/dist/out
RUN chown -R node /user/src/app/dist/out

USER node
CMD ["npm", "run", "build"]
