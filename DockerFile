FROM node:15-alpine
RUN mkdir -p /api
WORKDIR /api
ENV NODE_ENV=dev
ENV NODE_OPTIONS=--max_old_space_size=2000
ARG TZ='America/Mexico_City'
ENV TZ ${TZ}
COPY ./ ./
RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm -rf \
    /var/cache/apk/*
RUN npm install
EXPOSE 80
RUN npm run build
CMD [ "npm", "run", "serve" ]