# 04 - dockerfile stages

## Image size without stages
Let's try and build the dockerfile in this folder, and see how big the final image is:

```
docker build -t docker-example-api .
docker images docker-example-api
```

That's quite a large image. Let's see if we can make it smaller.

## Let's use a different image for runtime
The problem we have is that we need the dotnet sdk image for building our API, but we don't need all of the SDK to actually run the API. Instead, we can use the much smaller `mcr.microsoft.com/dotnet/aspnet:5.0` image.

So, let's update our dockerfile to use that:

**Replace** the last line of the dockerfile with the following:
```
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS final
WORKDIR /app
COPY --from=build /src/publish .

ENTRYPOINT ["dotnet", "dotnet-api.dll"]
```

This will:
- create a new stage in the image
- copy the publish output from the build stage to this final stage

Now, let's build the dockerfile again, and see how much smaller the image is:
```
docker build -t docker-example-api .
docker images docker-example-api
```

Much better :)
