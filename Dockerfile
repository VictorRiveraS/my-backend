FROM node:15-alpine
RUN mkdir -p /api
WORKDIR /api
ENV NODE_ENV=dev
ENV NODE_OPTIONS=--max_old_space_size=8192
ARG TZ='America/Mexico_City'
ENV TZ ${TZ}
COPY ./ ./
RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm -rf \
    /var/cache/apk/*
RUN npm install
EXPOSE 3000
RUN mkdir /logs
RUN chmod 777 -R /logs
RUN chown -R node: /logs
CMD [ "npm", "run", "serve" ]