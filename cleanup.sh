#!/bin/bash

kubectl -n technical-test delete deployment,svc --all
kubectl get deployments,pods,svc --namespace=technical-test