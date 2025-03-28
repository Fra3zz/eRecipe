# Stage 1: Build the React/Vite application
FROM node:iron-alpine3.19 AS build

WORKDIR /app

# Set build argument for VITE_DOMAIN
ARG VITE_DOMAIN

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Inject environment variable into Vite's build
ENV VITE_DOMAIN="${VITE_DOMAIN}"

# Build the React/Vite app
RUN npm run build

# Stage 2: Serve the built application using NGINX
FROM nginx:alpine

# Copy the custom nginx.conf to the appropriate directory
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the `build` stage to the NGINX web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
