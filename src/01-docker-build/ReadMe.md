# 01 - docker build basics

## Let's build our first container
1. Build the dockerfile, and watch the output from each stage:
    ```docker build .```
2. Build it again, and see that it now takes advantage of caching:
    ```docker build .```
3. Build it on more time, this time disabling caching and see that it now ignores the cached layers:
    ```docker build --no-cache .```
