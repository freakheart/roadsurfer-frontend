# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=14
ARG NGINX_VERSION=1.17

# "development" stage
FROM node:${NODE_VERSION}-alpine AS frontend_development

WORKDIR /usr/src/frontend

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN set -eux; \
	apk add --no-cache --virtual .gyp \
		g++ \
		make \
		python \
	; \
	yarn install; \
	apk del .gyp

COPY . ./

VOLUME /usr/src/frontend/node_modules

CMD ["yarn", "start"]

# "build" stage
# depends on the "development" stage above
FROM frontend_development AS frontend_build

ARG REACT_APP_API_ENTRYPOINT

RUN set -eux; \
	yarn build

# "nginx" stage
# depends on the "build" stage above
FROM nginx:${NGINX_VERSION}-alpine AS frontend_nginx

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/frontend/build

COPY --from=frontend_build /usr/src/frontend/build ./