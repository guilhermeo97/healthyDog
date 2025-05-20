FROM node:20-alpine
WORKDIR /healthy_dog
COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN rm -rf node_modules package-lock.json \
    && npm install
COPY . .
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]
