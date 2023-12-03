FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN yarn

# Generate the build of the application
RUN yarn build --configuration=production

FROM nginx:latest

# Copy the default nginx.conf provided
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/gl4-angular-1 /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT [ "./entrypoint.sh" ]