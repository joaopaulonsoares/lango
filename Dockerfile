FROM node:11.12.0

# Install a bunch of node modules that are commonly used.
ADD package.json /usr/app/
ADD . /usr/app/

EXPOSE 80
ENV BIND_HOST=0.0.0.0
CMD ["npm", "start"]
WORKDIR /usr/app

#RUN npm install shelljs

#RUN npm install cross-env
#RUN npm run build:dll


#RUN npm config set scripts-prepend-node-path true
#RUN yarn start
#RUN npm install
#RUN npm audit fix --force

# Add default setup files.
#ADD .babelrc server.js webpack.config.js /usr/app/
#ADD cfg /usr/app/cfg
RUN npm install compare-versions

RUN npm install
RUN npm run setup