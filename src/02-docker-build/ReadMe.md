# 02 - dockerfile dependencies

## Building with a missing dependency
Let's try and build the dockerfile in this folder, and watch the output:

```
docker build .
```

You should see the following output:

```
/bin/sh: node: not found
```

## Let's install node
The problem we have is that we don't have node installed in the image. This is because the image we're based on (alpine linux) doesn't have the node application installed.

So, let's install it to make it part of the container:

Add the following to the dockerfile **at line 3**:
```
RUN apk add --update nodejs
RUN rm -f /var/cache/apk/*
```
This will:
- updates apk's cache of available packages (APK is the alpine linux package manager)
- install a package called "nodejs"
- clean up the cache, since we don't need it anymore and we want to keep our image small

Now, let's build the dockerfile again:
```
docker build .
```
