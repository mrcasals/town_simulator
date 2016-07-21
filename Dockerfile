FROM node:latest
MAINTAINER david.morcillo@gmail.com

ENV APP_HOME /code
WORKDIR $APP_HOME

RUN npm install -g webpack karma-cli

ADD package.json /tmp
RUN cd /tmp && npm install && cp -r node_modules $APP_HOME

ADD . $APP_HOME

CMD ["npm", "start"]