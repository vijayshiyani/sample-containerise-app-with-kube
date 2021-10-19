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
# check existing dployments pods and services
$ kubectl get deployments,pods,svc
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   153m

# create deployment using assignment-app-deploy.yaml
$ kubectl create -f assignment-app-deploy.yaml

# create service using assignment-app-service.yaml
$ kubectl create -f assignment-app-service.yaml

# verify deployment
$ kubectl get deployments,pods,svc
NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/assignment-app-deploy   1/1     1            1           2m29s

NAME                                       READY   STATUS    RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-bsj42   1/1     Running   0          2m29s

NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/assignment-service   NodePort    10.110.69.215   <none>        80:30005/TCP   86s
service/kubernetes           ClusterIP   10.96.0.1       <none>        443/TCP        158m

```

## Access app & app logs

```bash

# get url
$ minikube service assignment-service --url
🏃  Starting tunnel for service assignment-service.
|-----------|--------------------|-------------|------------------------|
| NAMESPACE |        NAME        | TARGET PORT |          URL           |
|-----------|--------------------|-------------|------------------------|
| default   | assignment-service |             | http://127.0.0.1:61334 |
|-----------|--------------------|-------------|------------------------|
http://127.0.0.1:61334


# get pod name and dump  pod logs (stdout)
$ kubectl get deployments,pods,svc
$ kubectl logs assignment-app-deploy-64455c7d-bsj42

```

## scale up and down deployment

```bash

# scale up 3 replicas
$ kubectl scale deployment assignment-app-deploy --replicas=3
NAME                                       READY   STATUS    RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-bsj42   1/1     Running   0          15m
pod/assignment-app-deploy-64455c7d-d6fr6   1/1     Running   0          49s
pod/assignment-app-deploy-64455c7d-wzw7m   1/1     Running   0          49s

$ kubectl scale deployment assignment-app-deploy --replicas=1
$ kubectl get deployments,pods,svc
NAME                                       READY   STATUS    RESTARTS   AGE
pod/assignment-app-deploy-64455c7d-bsj42   1/1     Running   0          17m

```

## shell access running pods

```bash
# Interactive shell access to a running pod
kubectl exec --stdin --tty assignment-app-deploy-64455c7d-bsj42  -- /bin/sh
```

## clean up

```bash
$ kubectl delete service assignment-service
$ kubectl delete deployment assignment-app-deploy
$ minikube stop
```
