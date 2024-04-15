# Node LTS
FROM node:20.9.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH to use npm binaries
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./app .
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]