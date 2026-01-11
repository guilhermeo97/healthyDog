FROM node:22-alpine
WORKDIR /healthydog
COPY package*.json ./
RUN rm -rf node_modules package-lock.json \
    && npm install
COPY . .
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]

