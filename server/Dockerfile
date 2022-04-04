FROM node:16-alpine3.14
RUN apk add alpine-sdk
# Follow the install guide from creator of pigpio, http://abyz.me.uk/rpi/pigpio/download.html
RUN wget --output-document=download.zip https://github.com/joan2937/pigpio/archive/master.zip \
# Downloaded content is placed inside specific folder to not be depended of branch naming from repo
    && mkdir download \
    && unzip -d download download.zip \
    && cd /download/* \
# Fix for compiling on Alpine, https://github.com/joan2937/pigpio/issues/107
    && sed -i -e 's/ldconfig/echo ldconfig disabled/g' Makefile \
    && make \
    && make install
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache python3 \
        py3-pip \
        gcc \
        g++ \
        linux-headers \
        udev \
        && npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]

