FROM node:lts-alpine
RUN npm install -g npm@latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

RUN addgroup -S nodegroup --gid 2001 
RUN adduser -S nodejs -u 2001 -G nodegroup

RUN chown -R nodejs /usr/src/app
RUN mkdir -p /home/node/dist
RUN chown -R nodejs /home/node/dist

USER nodejs
CMD ["npm", "run", "build"] 

