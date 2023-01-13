ARG SOURCE_INSTALL_IMAGE=node:18.12-slim
FROM $SOURCE_INSTALL_IMAGE
WORKDIR /var/www
COPY . .
RUN npm install -g pnpm
RUN pnpm install --shamefully-hoist
RUN pnpm build
CMD ["pnpm", "start-debug"]
