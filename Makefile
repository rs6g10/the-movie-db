# Detect if we should be using a TCP connection rather than socket.
# If so, we probably don't need to run docker as root, which you
# typically do in order to access /var/run/docker.sock

DSOCK_READ = $(shell test -r /var/run/docker.sock && echo true)
s = sudo

# docker is listening on a tcp socket not a unix socket
# e.g. boot2docker, or you've changed it for some reason
# so you don't need to run the docker command as root
ifdef DOCKER_HOST
	s =
endif

# If you can read the unix socket (maybe you're a member
# of the docker group) then you don't need to run the
# docker command as root
ifeq ($(DSOCK_READ),true)
	s =
endif

docker = $s docker

build:
	@echo Building the-movie-db...
	$(docker) build -t the-movie-db .

run:
	@echo Running the-movie-db...
	@$(docker) run --rm --name the-movie-db \
		-v "$(shell pwd):/home/admin/the-movie-db" \
		-v "/home/admin/the-movie-db/node_modules" \
		-p 3000:3000 \
		-p 9222:9222 \
		-p 4000:4000 \
		-u root \
		-e NODE_ENV=development \
		-e API_KEY=MYSUPERSECRETKEY \
		-it the-movie-db /bin/sh

attach:
	@echo Attaching to the-movie-db...
	@$(docker) exec -it the-movie-db /bin/sh

test:
	@echo Running the-movie-db tests...
	@$(docker) run --rm --name the-movie-db-test \
		-it the-movie-db npm test

lint:
	@echo Running eslint...
	@$(docker) run --rm --name the-movie-db-test -v "$(shell pwd):/home/admin/the-movie-db" -v "/home/admin/the-movie-db/node_modules" -p 3000:3000 -it the-movie-db npm run lint

