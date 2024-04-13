# Last LTS version of node
FROM node:20.9.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH to use npm binaries
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./app/package.json ./package.json
COPY ./app/package-lock.json ./package-lock.json
RUN npm install

CMD ["ng", "serve"]