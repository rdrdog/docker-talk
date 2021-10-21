# 10 - Running a container

Let's actually run one of these container now!

## Building the image
When we build this image, we're going to also give it a name which is referred to as a "tag".

```
docker build -t node-example-api:a1b2c3d4 .
```
The tag (`-t node-example-api:a1b2c3d4`) is a way for us to refer to the image so that when we want to run it, we are sure we're running a specific instance of the image.

Tags can be any string you like, although typically tags consist of a constant component which is the name of the container image, and then a version component.
In our tag, the name is `node-example-api`, and the version is `a1b2c3d4`.

Versions can be anything you like - often the commit sha of your git repo is used as a way to tie the container image you're building back to a specific code version.

## Running the image
Now we're going to run the image.

There are a few things to consider when it comes to running an image. For now, let's just run the following command and get our API container running:

```
docker run --name api --rm -p 8080:3000 node-example-api:a1b2c3d4
```

Let's open up our browser and see if our API is listening:
http://localhost:8080/

Stop the container by pressing CTRL + C.

## Name argument
Although optional, it's often a good idea to name our running containers.

## Port mapping
You might have noticed something strange here. The app reports that it's listening on port 3000, yet we're seeing it on port 8080.
That's because in our docker-run command, we specify a port mapping as `-p 8080:3000`.
That this means is we're going to map a port on our local machine (8080), to the running container (3000).
These can be the same port, and in this case we're just making them different to illustrate this point.

## Remove on exit
One other argument we're specifying is `--rm`. This removes the container after it has completed running.
If you don't this this, it's fine. You'll just have the container sitting ready to be started up again later. More on this next!

## Resource usage
You might have noticed that the container was pretty quick to start - certainly faster than starting a VM!
Let's restart it, and let's have a look at its memory and CPU footprint:

```
docker run --name api --rm -p 8080:3000 node-example-api:a1b2c3d4
```

And in another terminal:

```
docker stats api
```

You should see something like:

```
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O    PIDS
202b1609a157   api       0.00%     21.11MiB / 3.841GiB   0.54%     2.94kB / 885B   0B / 4.1kB   18
```

Although a trivial example, you'll find that containers use up a fraction of the memory and CPU that a full blown VM image uses. This is mainly because they're only running the absolute minimum to run your application. No notepad.exe here sorry!
