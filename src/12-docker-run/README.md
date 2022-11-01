# 12 - Volumes

In some cases, you may want to persist data across container restarts. For example, you might be running a database server as a container.
In this case, while the container is immutable, the data shouldn't die with the container.

A common way to solve this is to use volume mounts


## Running our container with a volume mount
> If you haven't already, run the docker build command from _src/10-docker-run/README.md_.

Let's create a folder in our current directory, and then run our API. When we run it, we're going to mount our folder into the MOTD folder of the container.

```
mkdir -p mounted
docker run --name api -d -p 8080:3000 -v $(pwd)/mounted:/working/MOTD/ node-example-api:a1b2c3d4
```

## The volume mount
The new argument here is `-v $(pwd)/mounted:/working/MOTD/`. This is volume mounting a folder in our current working directory named 'mounted' onto a folder in the container at _/working/MOTD/_.

When we view our API in the browser now (http://localhost:8080/), it should be saying "Hello World".
This is because the API has logic to fall back to a default message if there's not motd.txt file.
So let's fix that.

## A new motd
Let's make a file in our _mounted_ folder called 'motd.txt' and put a message in it:

```
printf "I'm putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do." > mounted/motd.txt
```

When we view our API in the browser now, it should be showing our new message.

## Destroying and restarting the container
Because our message is coming from our host computers file system, destroying the container and restarting it will not cause us to lose our data.

```
docker stop api
docker rm api
docker run --name api -d -p 8080:3000 -v $(pwd)/mounted:/working/MOTD/ node-example-api:a1b2c3d4
```

When we view our API in the browser now, it should be still showing our new message.


## Clean up
To clean up, stop and remove the container:

```
docker stop api
docker rm api
```
