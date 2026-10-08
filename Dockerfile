
# single stage docker file
# FROM  node:20
# WORKDIR /myapp

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]


# multi stage docker file

FROM node:slim AS builder

WORKDIR /reapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /reapp/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]

