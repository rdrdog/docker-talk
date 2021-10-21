# 10 - Containers are immutable

One thing that you might have heard about containers is that they are _immutable_.
What this means is that if you need to modify the contents of a container at runtime, all changes will be lost when the container restarts.

Let's see this in action.

## Running our image from 10-docker-run
> If you haven't already, run the docker build command from _src/10-docker-run/README.md_.

Let's run our image API, but this time, we're not going to remove it after it's done, and we're going to run it in the background:
```
docker run --name api -d -p 8080:3000 node-example-api:a1b2c3d4
```

You'll notice that docker prints out a long hash, and returns back to your prompt.

Let's check our image is running:
```
docker ps --latest
```

You should see something like this:

```
CONTAINER ID   IMAGE                       COMMAND                  CREATED          STATUS          PORTS                                       NAMES
1663b99ed8e8   node-example-api:a1b2c3d4   "/bin/sh -c 'npm sta…"   23 seconds ago   Up 22 seconds   0.0.0.0:8080->3000/tcp, :::8080->3000/tcp   api
```

Let's also make sure our API is running by going http://localhost:8080/ in our browser.

## Daemon argument
The other new argument we have is `-d` which runs the container in _daemon_ mode. This is a fancy way of saying "run in the background".

## Name argument
One of the new arguments we've specified is `--name` which allows us to easily refer to the container. You'll see why next.

## Modifying the container while it's running
Okay, so let's do something a bit crazy - let's execute a shell into the running container, and mess about with it:

```
docker exec -it api sh
```
Here, we're saying "execute a command on the container named "api", and do it using an interactive session. The command to execute is `sh`, which is a linux shell.

Now, we have suddenly been launched into a shell terminal _inside our running container_!
We can look around in here, just like any other remote terminal (try running `ls -la`).

Now, let's update our message of the day for our API by overwriting the existing motd.txt file:

```
printf "I'm sorry Dave, I'm afraid I can't do that." > MOTD/motd.txt
```

When we look at our API in the browser now, we'll see our new message of the day.

## Let's kill our unruly container
So we've got a container that's now impure - it's been modified at runtime, and that simply will not do.
Let's restart it and see if those changes persist:

```
docker restart api
```

When we look at our API in the browser, you'll see that indeed, the changes _do_ persist.
This is because we've just restarted our running container. It's file system remains intact, and so that's not enough to kill it completely.

Let's stop it, and remove it:

```
docker stop api
docker rm api
```

The container is now gone.
Let's recreate it, based on the same original image:

```
docker run --name api -d -p 8080:3000 node-example-api:a1b2c3d4
```

And finally, view the fresh new container in our browser.

## Clean up
To clean up, stop and remove the container:

```
docker stop api
docker rm api
```
