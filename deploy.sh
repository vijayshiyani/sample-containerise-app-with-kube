#!/bin/bash

kubectl apply -f technical-test-namespace.yaml
kubectl create -f assignment-app-deploy.yaml
kubectl create -f assignment-app-service.yaml
kubectl get deployments,pods,svc --namespace=technical-test
