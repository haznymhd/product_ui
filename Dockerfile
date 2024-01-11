# Use an official Node.js runtime as the base image
FROM public.ecr.aws/docker/library/node:slim AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the built app
FROM public.ecr.aws/nginx/nginx:stable-perl

# Copy the built app from the previous stage to the nginx directory
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
