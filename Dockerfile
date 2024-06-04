FROM node:lts-alpine
RUN npm install -g npm@latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
RUN mkdir -p /home/node/dist
RUN chown -R node /home/node/dist

RUN groupadd -g 2001 nodegroup 
RUN useradd -u 2001 -g nodegroup -m nodejs

USER nodejs
CMD ["npm", "run", "build"] 

