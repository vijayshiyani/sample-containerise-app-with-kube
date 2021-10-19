# Deploy and scale assignment app with minikube kubernetes

Before starting, make sure you have at least those components on your workstation:

- minikube https://minikube.sigs.k8s.io/docs/start/
- kubectl https://minikube.sigs.k8s.io/docs/handbook/kubectl/

## Objective

- Deploy previously build assignment docker container image https://hub.docker.com/r/vijayshiyani/assignment to minikube
- run and access the app
- scale up and down deployment
- view application logs
- shell access running pods
- clean up

## Verify minikube status

```bash
$ minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

## Deploy

```bash
$ ./deploy.sh

deployment.apps/assignment-app-deploy created
service/assignment-service created
NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/assignment-app-deploy   0/1     1            0           0s

NAME                                       READY   STATUS              RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-9h9db   0/1     ContainerCreating   0          0s

NAME                         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/assignment-service   NodePort   10.97.239.227   <none>        80:30005/TCP   0s
```

## Access app & app logs

```bash

# get url
$ minikube service assignment-service --url --namespace=technical-test
🏃  Starting tunnel for service assignment-service.
|-----------|--------------------|-------------|------------------------|
| NAMESPACE |        NAME        | TARGET PORT |          URL           |
|-----------|--------------------|-------------|------------------------|
| default   | assignment-service |             | http://127.0.0.1:61334 |
|-----------|--------------------|-------------|------------------------|
http://127.0.0.1:61334


# get pod name and dump  pod logs (stdout)
$ kubectl get deployments,pods,svc --namespace=technical-test
$ kubectl logs assignment-app-deploy-64455c7d-9h9db --namespace=technical-test

```

## scale up and down deployment

```bash

# scale up 3 replicas
$ kubectl scale deployment assignment-app-deploy --replicas=3 --namespace=technical-test
NAME                                       READY   STATUS    RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-bsj42   1/1     Running   0          15m
pod/assignment-app-deploy-64455c7d-d6fr6   1/1     Running   0          49s
pod/assignment-app-deploy-64455c7d-wzw7m   1/1     Running   0          49s

$ kubectl scale deployment assignment-app-deploy --replicas=1 --namespace=technical-test
$ kubectl get deployments,pods,svc
NAME                                       READY   STATUS    RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-bsj42   1/1     Running   0          17m

```

## shell access running pods

```bash
# Interactive shell access to a running pod
kubectl --namespace=technical-test exec --stdin --tty assignment-app-deploy-64455c7d-9h9db  -- /bin/sh
```

## clean up

```bash
$ ./cleanup.sh
```
