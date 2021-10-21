# Build container
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Copy the code into the container
WORKDIR /src

# We start with copying our csproj files so that we can restore dependencies first.
# This is because dependencies change less frequently than source code, and it allows us to take advantage of cached docker layers
COPY dotnet-api.csproj .
RUN dotnet restore dotnet-api.csproj

# Copy the rest of our source code
COPY . .
# Build the API
RUN dotnet publish --no-restore dotnet-api.csproj -c Release -o /src/publish

ENTRYPOINT ["dotnet", "/src/publish/dotnet-api.dll"]
