# Hubflow Automation — Deployment Architecture

## Overview

Hubflow Automation is designed as a containerized, cloud-ready application that can be deployed on AWS using Kubernetes.

The deployment architecture combines:

* **Docker** — Application containerization
* **GitHub Actions** — CI/CD automation
* **AWS** — Cloud infrastructure
* **Kubernetes** — Container orchestration
* **Nginx** — Reverse proxy and traffic routing

The overall deployment flow is:

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    │ GitHub Actions
    ▼
┌─────────────────────────┐
│     GitHub Actions      │
│                         │
│  1. Checkout Code       │
│  2. Install Dependencies│
│  3. Build Application   │
│  4. Run Tests           │
│  5. Build Docker Image  │
│  6. Push Docker Image   │
└────────────┬────────────┘
             │
             ▼
     Docker Container
        Registry
             │
             │ Pull Image
             ▼
┌────────────────────────────────────────┐
│                 AWS                    │
│                                        │
│        ┌─────────────────────┐         │
│        │ Kubernetes / EKS    │         │
│        │                     │         │
│        │   Nginx Ingress     │         │
│        │          │          │         │
│        │          ▼          │         │
│        │   Hubflow Service   │         │
│        │          │          │         │
│        │    ┌─────┴─────┐    │         │
│        │    ▼           ▼    │         │
│        │  App Pod     App Pod│         │
│        │    │           │    │         │
│        │    └─────┬─────┘    │         │
│        │          │          │         │
│        │          ▼          │         │
│        │       MySQL         │         │
│        │    + Persistent     │         │
│        │       Storage       │         │
│        └─────────────────────┘         │
│                                        │
└───────────────────┬────────────────────┘
                    │
                    ▼
                  Users
```

---

# 1. Docker

Docker is used to package the Hubflow application and its runtime dependencies into a portable container image.

Instead of deploying the application directly onto an operating system, the application is packaged into a Docker image.

```text
Source Code
     │
     ▼
 Dockerfile
     │
     ▼
Docker Image
     │
     ▼
Container Registry
     │
     ▼
Kubernetes
```

## Docker Responsibilities

Docker provides:

* Application containerization
* Consistent runtime environment
* Dependency isolation
* Reproducible builds
* Portable deployments
* Easy integration with CI/CD

A typical image can be tagged using the GitHub Actions build number or commit SHA:

```text
hubflow:<commit-sha>
```

For example:

```text
hubflow:a82f91c
```

Using immutable version tags makes it possible to identify exactly which version is deployed.

---

# 2. Container Registry

After the Docker image is built, GitHub Actions pushes it to a container registry.

The registry can be:

* Docker Hub
* GitHub Container Registry
* Amazon ECR

For AWS deployment, **Amazon ECR** is a natural choice.

```text
GitHub Actions
      │
      │ docker push
      ▼
Amazon ECR
      │
      │ image pull
      ▼
Amazon EKS
```

The Kubernetes cluster pulls the required application image from the registry when creating or updating application Pods.

---

# 3. AWS

AWS provides the cloud infrastructure on which the application is deployed.

For a production-oriented Kubernetes architecture, Amazon EKS can be used.

## AWS Architecture

```text
                         AWS Cloud
                            │
                            ▼
                    ┌───────────────┐
                    │  Amazon EKS   │
                    │   Cluster     │
                    └───────┬───────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       Application Pods              Kubernetes Services
             │                             │
             ▼                             ▼
          Hubflow                       Nginx
                                          │
                                          ▼
                                      Internet
```

AWS can provide the underlying:

* Compute resources
* Networking
* Load balancing
* Storage
* IAM
* Container registry
* Monitoring
* Security infrastructure

---

# 4. Amazon EKS

Amazon Elastic Kubernetes Service (EKS) can be used to run the Kubernetes cluster.

The application runs inside Kubernetes Pods.

```text
AWS
 │
 └── EKS Cluster
       │
       ├── Worker Nodes
       │      │
       │      ├── Hubflow Pod
       │      ├── Hubflow Pod
       │      └── MySQL Pod
       │
       └── Kubernetes Services
```

Multiple application replicas can be deployed:

```text
              Hubflow Service
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Hubflow Pod 1       Hubflow Pod 2
```

If one application Pod fails, Kubernetes can create a replacement Pod.

---

# 5. Kubernetes

Kubernetes is responsible for orchestrating the Docker containers.

The Kubernetes deployment manages:

* Application Pods
* Services
* Deployments
* StatefulSets
* Persistent Volumes
* ConfigMaps
* Secrets
* Ingress
* Health checks
* Scaling
* Rolling updates

## Kubernetes Architecture

```text
                    Kubernetes Cluster
                           │
                    hubflow Namespace
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      ConfigMap         Secret          Ingress
                                           │
                                           ▼
                                      Nginx Ingress
                                           │
                                           ▼
                                    Hubflow Service
                                           │
                              ┌────────────┴────────────┐
                              ▼                         ▼
                         App Pod 1                  App Pod 2
                              │                         │
                              └────────────┬────────────┘
                                           │
                                           ▼
                                      MySQL Service
                                           │
                                           ▼
                                    MySQL StatefulSet
                                           │
                                           ▼
                                      Persistent
                                       Storage
```

---

# 6. Kubernetes Deployment

The Hubflow application is deployed using a Kubernetes Deployment.

Example:

```yaml
replicas: 2
```

This creates two application Pods.

```text
Hubflow Deployment
       │
       ├── Pod 1
       │
       └── Pod 2
```

The Kubernetes Service provides stable networking to these Pods.

This allows the Pods to be recreated or replaced without changing the application endpoint.

---

# 7. MySQL Deployment

MySQL is a stateful application and therefore requires persistent storage.

The architecture uses a StatefulSet together with a PersistentVolumeClaim.

```text
MySQL StatefulSet
       │
       ▼
   MySQL Pod
       │
       ▼
PersistentVolumeClaim
       │
       ▼
Persistent Storage
```

The persistent storage ensures that database data is not lost when the MySQL Pod is recreated.

For a production AWS environment, the database can alternatively be moved to **Amazon RDS for MySQL**, allowing the Kubernetes cluster to focus primarily on stateless application workloads.

---

# 8. Nginx

Nginx acts as the entry point for external HTTP/HTTPS traffic.

In Kubernetes, Nginx Ingress can be used to route incoming requests to the appropriate Kubernetes Service.

```text
Internet
    │
    ▼
AWS Load Balancer
    │
    ▼
Nginx Ingress
    │
    ▼
Hubflow Service
    │
    ▼
Application Pods
```

## Nginx Responsibilities

Nginx can handle:

* Reverse proxying
* HTTP/HTTPS traffic
* Host-based routing
* Path-based routing
* TLS termination
* Traffic forwarding
* Load distribution

For example:

```text
https://hubflow.example.com
             │
             ▼
       Nginx Ingress
             │
             ▼
      Hubflow Service
             │
       ┌─────┴─────┐
       ▼           ▼
    Pod 1         Pod 2
```

---

# 9. GitHub Actions CI/CD

GitHub Actions automates the application build and deployment lifecycle.

Whenever code is pushed to the configured branch, the GitHub Actions workflow can execute automatically.

## CI/CD Flow

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Checkout
    │
    ├── Install Dependencies
    │
    ├── Lint
    │
    ├── Test
    │
    ├── Build Application
    │
    ├── Build Docker Image
    │
    ├── Security Scan
    │
    ├── Push Image
    │
    └── Deploy
            │
            ▼
       Kubernetes / EKS
```

---

# 10. Continuous Integration

The CI stage validates the application before deployment.

Typical steps include:

```text
Checkout
   ↓
Install Dependencies
   ↓
Lint
   ↓
Unit Tests
   ↓
Build
```

If one of these stages fails, the workflow stops and the deployment stage is not executed.

This prevents broken code from reaching the deployment environment.

---

# 11. Docker Build in GitHub Actions

After successful validation, GitHub Actions builds the Docker image.

Example flow:

```text
Application Source
       │
       ▼
    Dockerfile
       │
       ▼
 Docker Build
       │
       ▼
 hubflow:<commit-sha>
```

The image is then pushed to the configured registry.

For example:

```text
Amazon ECR
└── hubflow
      ├── a82f91c
      ├── 71bc22a
      └── 4f91d82
```

---

# 12. Continuous Deployment

After the Docker image is successfully pushed, the deployment process updates Kubernetes.

```text
GitHub Actions
      │
      ▼
Amazon ECR
      │
      ▼
Amazon EKS
      │
      ▼
Update Deployment
      │
      ▼
Rolling Update
      │
      ▼
New Application Pods
```

Kubernetes gradually replaces the old Pods with new Pods.

This minimizes application downtime during deployment.

---

# 13. Complete Deployment Flow

The complete process can be summarized as:

```text
┌──────────────────┐
│    Developer     │
└────────┬─────────┘
         │
         │ git push
         ▼
┌──────────────────┐
│     GitHub       │
└────────┬─────────┘
         │
         │ trigger
         ▼
┌────────────────────────────┐
│      GitHub Actions        │
│                            │
│ Checkout                   │
│ Lint                       │
│ Test                       │
│ Build                      │
│ Docker Build               │
│ Security Scan              │
│ Docker Push                │
│ Kubernetes Deployment      │
└────────────┬───────────────┘
             │
             ▼
       ┌─────────────┐
       │   AWS ECR   │
       │   Registry  │
       └──────┬──────┘
              │
              │ Pull Image
              ▼
       ┌─────────────────────┐
       │      AWS EKS        │
       │                     │
       │  Kubernetes Cluster │
       └──────────┬──────────┘
                  │
                  ▼
            ┌───────────┐
            │   Nginx   │
            │  Ingress  │
            └─────┬─────┘
                  │
                  ▼
           ┌─────────────┐
           │   Service   │
           └──────┬──────┘
                  │
            ┌─────┴─────┐
            ▼           ▼
         App Pod     App Pod
            │           │
            └─────┬─────┘
                  │
                  ▼
             MySQL
                  │
                  ▼
          Persistent Storage
```

---

# 14. Deployment Lifecycle

The expected deployment lifecycle is:

### Step 1 — Developer Changes Code

A developer modifies the application and commits the changes.

### Step 2 — Push to GitHub

```bash
git add .
git commit -m "Update Hubflow application"
git push origin main
```

### Step 3 — GitHub Actions Starts

GitHub Actions detects the push and starts the CI/CD workflow.

### Step 4 — Application Validation

The workflow performs:

```text
Install
Lint
Test
Build
```

### Step 5 — Docker Image Creation

The application is packaged into a Docker image.

### Step 6 — Image Registry

The image is pushed to Amazon ECR or another configured container registry.

### Step 7 — Kubernetes Deployment

The Kubernetes deployment is updated with the new image.

### Step 8 — Rolling Update

Kubernetes gradually replaces old Pods.

### Step 9 — Health Verification

Kubernetes readiness and liveness checks verify application health.

### Step 10 — Traffic

Nginx routes external requests to healthy application Pods.

---

# 15. Configuration Management

Kubernetes separates application configuration from the container image.

## ConfigMap

Used for non-sensitive configuration:

```text
NODE_ENV
PORT
JWT_EXPIRES_IN
MYSQL_DATABASE
```

## Secret

Used for sensitive configuration:

```text
MYSQL_PASSWORD
MYSQL_ROOT_PASSWORD
JWT_SECRET
```

The Docker image therefore does not need to contain environment-specific secrets.

```text
Docker Image
     │
     └── Application Code

Kubernetes
     │
     ├── ConfigMap
     │
     └── Secret
```

---

# 16. Security Architecture

The deployment architecture follows basic security principles.

```text
Internet
   │
   ▼
Nginx / Load Balancer
   │
   ▼
Kubernetes Service
   │
   ▼
Application Pods
   │
   ├── Secrets
   └── ConfigMap
```

Security practices include:

* HTTPS/TLS
* Kubernetes Secrets
* IAM-based AWS access
* Private container registry
* Docker image scanning
* Dependency scanning
* Network restrictions
* Least-privilege access
* No credentials committed to Git

---

# 17. Scalability

The architecture allows the application layer to scale horizontally.

For example:

```text
                  Hubflow Service
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
     Pod 1            Pod 2            Pod 3
```

Kubernetes can increase the number of application replicas when required.

Future implementation can use the Kubernetes Horizontal Pod Autoscaler:

```text
CPU / Memory / Custom Metrics
             │
             ▼
Horizontal Pod Autoscaler
             │
             ▼
Increase / Decrease Pods
```

---

# 18. High Availability

Multiple application replicas provide basic application-level availability.

```text
                 Nginx
                   │
             Hubflow Service
                   │
          ┌────────┴────────┐
          ▼                 ▼
       App Pod 1         App Pod 2
```

If one Pod becomes unavailable, Kubernetes can route traffic to the remaining healthy Pod and create a replacement.

For production AWS deployment, availability can be improved further by distributing workloads across multiple Availability Zones.

---

# 19. Rollback Strategy

Because Docker images are versioned, deployments can be traced to a specific Git commit or build.

Example:

```text
Version A
hubflow:a82f91c
       │
       ▼
   Production
       │
       ▼
Version B
hubflow:b71cd21
       │
       ▼
Deployment Failure
       │
       ▼
Rollback
       │
       ▼
hubflow:a82f91c
```

Kubernetes also maintains deployment revision history:

```bash
kubectl rollout history deployment/hubflow-app -n hubflow
```

Rollback can be performed using:

```bash
kubectl rollout undo deployment/hubflow-app -n hubflow
```

---

# 20. Monitoring and Health Checks

Kubernetes health checks are used to determine whether application Pods are healthy.

### Liveness Probe

Determines whether the application container is functioning.

### Readiness Probe

Determines whether the Pod is ready to receive traffic.

```text
Application Pod
      │
      ├── Liveness Check
      │
      └── Readiness Check
               │
               ▼
        Receive Traffic
```

For a production AWS environment, monitoring can be extended using:

* Amazon CloudWatch
* Prometheus
* Grafana
* Centralized logging
* Application monitoring

---

# 21. Why This Architecture?

The architecture separates responsibilities across different technologies.

| Technology         | Responsibility                  |
| ------------------ | ------------------------------- |
| GitHub             | Source code management          |
| GitHub Actions     | CI/CD automation                |
| Docker             | Application containerization    |
| Amazon ECR         | Container image storage         |
| AWS                | Cloud infrastructure            |
| Amazon EKS         | Kubernetes cluster              |
| Kubernetes         | Container orchestration         |
| Nginx              | Reverse proxy / traffic routing |
| MySQL              | Transactional database          |
| Persistent Storage | Database data persistence       |

This separation makes the platform easier to deploy, maintain, scale, and troubleshoot.

---

# 22. Final Architecture Summary

```text
                         ┌──────────────┐
                         │  Developer   │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │    GitHub    │
                         └──────┬───────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │    GitHub Actions       │
                   │                        │
                   │ CI → Docker → CD       │
                   └───────────┬────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │  AWS ECR    │
                        └──────┬──────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │             AWS                 │
              │                                │
              │          Amazon EKS             │
              │                                │
              │       ┌──────────────┐         │
Internet ────▶│──────▶│ Nginx Ingress│         │
              │       └──────┬───────┘         │
              │              │                 │
              │              ▼                 │
              │       ┌──────────────┐         │
              │       │ Hubflow      │         │
              │       │ Service      │         │
              │       └──────┬───────┘         │
              │              │                 │
              │       ┌──────┴──────┐          │
              │       ▼             ▼          │
              │    App Pod       App Pod       │
              │       │             │          │
              │       └──────┬──────┘          │
              │              ▼                 │
              │          MySQL                 │
              │              │                 │
              │              ▼                 │
              │      Persistent Storage        │
              │                                │
              └────────────────────────────────┘
```

## Deployment Flow

**Developer → GitHub → GitHub Actions → Docker Build → Amazon ECR → Amazon EKS → Nginx → Kubernetes Service → Application Pods → MySQL → Persistent Storage**

This architecture provides a foundation for **automated, containerized, scalable, and cloud-ready deployment** of Hubflow Automation.
