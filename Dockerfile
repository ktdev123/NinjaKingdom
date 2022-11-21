FROM node:16-alpine as builder
WORKDIR /app
COPY . .

ARG node_protocol
ARG node_public_domain
ARG node_port

ENV node_protocol=$node_protocol
ENV node_public_domain=$node_public_domain
ENV node_port=$node_port

RUN npm ci
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]