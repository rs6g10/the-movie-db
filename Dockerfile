# The base image is an alphine node linux distro with node installed. The small
# size allows us to build, distribute and run images very quickly.
FROM mhart/alpine-node:8.8

# Pass through NODE ENV
ARG ARG_NODE_ENV=development
ENV NODE_ENV=$ARG_NODE_ENV

# Install build tools for New Relic
RUN apk add --no-cache make gcc g++ python

# Set the default port that we will ultimately be passed to the app. This will
# be over written by wherever this app gets deployed.
ENV PORT 3000

# This is implicit, but to make this file more explicit we ensure we are the
# root user.
USER root

# Create a user new user 'admin' to run the application instead of root. This
# limits the damage an image can do as it locks off nearly all directories from
# being modified.
RUN addgroup admin \
	&& adduser -S admin \
	&& addgroup admin admin

# Set home environment variable, we reference this later.
ENV HOME=/home/admin/

# Create the folders that will hold the app code ...
RUN mkdir -p $HOME/the-movie-db/

# ... and set the working directory to that directory.
WORKDIR $HOME/the-movie-db/

ADD package.json package-lock.json ./

RUN npm install

# Copy the rest of all the app source
COPY . .

# Grant user roo to write in it's current directory. This is needed to be able
# for this user to write some required files, like new relic's event cache.
RUN chown admin:admin .

# Build the project in prod, for dev `npm run dev` will build
RUN sh -c 'if [ "$NODE_ENV" != "development" ]; then npm run build; fi'

# Switch to the new roo user
USER admin

# Bake in the default run command.
CMD npm start -- -p $PORT
