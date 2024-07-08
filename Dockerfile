FROM node:lts-alpine
RUN npm install -g npm@latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

RUN groupadd -g 2001 nodegroup 
RUN useradd -u 2001 -g nodegroup -m nodejs

RUN chown -R nodejs /usr/src/app
RUN mkdir -p /home/node/dist
RUN chown -R nodejs /home/node/dist

USER nodejs
CMD ["npm", "run", "build"] 

