# 20 Kubectl

We interact with Kubernetes using the CLI tool named _kubectl_.

Let's take our container we built in the first docker-run stage and deploy that to kubernetes.

If you haven't already, you'll need to build that container from the 10-docker-run folder:

```
docker build -t node-example-api:a1b2c3d4 .
```

## Kubernetes Deployments

Everything in kubernetes is created using YAML files. There are a number of objects in Kubernetes, and in this particular case, we're going to be creating a _Namespace_, a _Deployment_, and a _Service_.

A _Namespace_ is a way to logically separate groups of objects. A _Service_ allows routing to one or more pods, and a _Deplyoment_ describes the these pods in detail.

Let's create our resources:
```
kubectl apply -f k8s.yaml
```

We've now told the API server what we want it to create - if everything is valid, it will go and start creating or replacing these resources as necessary.

Now let's check what's being created:

```
kubectl -n docker-tutorial get all
```

## Scaling
We can scale our pods up in a number of ways.

### Scaling up using kubectl
Let's try first from the command line:

```
kubectl -n docker-tutorial scale --replicas 4 deploy/kube-example
```

And let's see those pods come up:

```
kubectl -n docker-tutorial get pods
```

### Scaling up using our deployment yaml
Usually, you want to adjust your deployment configuration in your code. So let's edit the k8s.yaml with a new desired replica count. Update the k8s.yaml file at line 13 - change `replicas: 1` to `replicas: 2`, then re-apply the k8s.yaml file:

```
kubectl apply -f k8s.yaml
```

And let's see those pods scale to 2:

```
kubectl -n docker-tutorial get pods
```

### Connecting to the service
Exposing services to the world outside kubernetes is important if you want external traffic to be able to see your creations. We're going to do some basic port-forwarding to demonstrate that our service is accepting traffic:

```
kubectl -n docker-tutorial port-forward svc/kube-example-svc 8080:80
```
And now, if we go to http://localhost:8080/ we'll see our service.

## Cleanup
To clean everything up, simply run:

```
kubectl delete -f k8s.yaml
```
