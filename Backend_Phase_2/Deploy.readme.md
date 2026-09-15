# HubFlow — Containerized Application Deployment

## Overview

HubFlow is deployed as a containerized Node.js application with a MySQL database.

The deployment demonstrates a complete DevOps workflow using:

* Docker for application containerization
* Jenkins for CI/CD automation
* Terraform for infrastructure and Kubernetes resource provisioning
* Kubernetes for application orchestration
* MySQL 8.0 for persistent application data
* PersistentVolumeClaim for database persistence
* Kubernetes Secrets for sensitive configuration
* Kubernetes ConfigMap for non-sensitive configuration
* Kubernetes Services for internal and external communication

The goal of this deployment is to provide a reproducible, automated, and scalable application deployment architecture.

---

# Deployment Architecture

```text
                         Developer
                            |
                            |
                            v
                       Git Repository
                            |
                            |
                            v
                       +-----------+
                       |  Jenkins  |
                       +-----------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
        Build Docker Image          Terraform
              |                           |
              v                           v
       Docker Registry              Kubernetes
              |                    Resource Deployment
              |                           |
              +-------------+-------------+
                            |
                            v
                  +-------------------+
                  |    Kubernetes     |
                  |     Cluster       |
                  +-------------------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
      +---------------+          +----------------+
      | HubFlow App   |          | MySQL 8.0      |
      | Deployment    |          | StatefulSet    |
      +---------------+          +----------------+
              |                           |
        +-----+-----+                     |
        |           |                     |
        v           v                     v
     App Pod     App Pod          PersistentVolume
        |                                 |
        +---------------+-----------------+
                        |
                        v
                  Persistent Data
```

---

# Architecture Components

## 1. Git Repository

The Git repository contains:

```text
hubflow/
├── Dockerfile
├── application source code
├── terraform/
└── Jenkinsfile
```

Git acts as the source of truth for application code and deployment configuration.

A change pushed to the repository can trigger the Jenkins pipeline.

---

# 2. Jenkins

Jenkins is responsible for the Continuous Delivery workflow.

The pipeline performs the following operations:

```text
Checkout
   ↓
Build Docker Image
   ↓
Push Docker Image
   ↓
Terraform Init
   ↓
Terraform Validate
   ↓
Terraform Plan
   ↓
Terraform Apply
   ↓
Kubernetes Rollout
   ↓
Deployment Verification
```

The Jenkins pipeline is defined in:

```text
Jenkinsfile
```

---

# 3. Docker

The Node.js application is packaged into a Docker image.

Example:

```text
hubflow:42
```

Each Jenkins build generates a unique image tag based on the Jenkins build number.

For example:

```text
Build 40 → hubflow:40
Build 41 → hubflow:41
Build 42 → hubflow:42
```

This provides deployment traceability and makes it possible to identify exactly which application version is running.

Using unique image tags is preferred over relying only on:

```text
latest
```

---

# 4. Container Registry

After the Docker image is built, Jenkins pushes it to a container registry.

Example:

```text
Docker Hub
└── your-dockerhub-username/hubflow:42
```

The Kubernetes application deployment then uses the specific image version.

For example:

```text
your-dockerhub-username/hubflow:42
```

This prevents ambiguity between application versions.

---

# 5. Terraform

Terraform is used to manage the Kubernetes resources as Infrastructure as Code.

Terraform configuration is stored under:

```text
terraform/
```

Example structure:

```text
terraform/
├── providers.tf
├── variables.tf
├── terraform.tfvars
├── outputs.tf
├── namespace.tf
├── configmap.tf
├── secret.tf
│
├── mysql/
│   ├── pvc.tf
│   ├── statefulset.tf
│   └── service.tf
│
└── app/
    ├── deployment.tf
    └── service.tf
```

Terraform provides a declarative way to define the desired Kubernetes state.

The Jenkins pipeline runs:

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

---

# 6. Kubernetes Namespace

All HubFlow resources are deployed into a dedicated namespace:

```text
hubflow
```

This provides logical isolation from other workloads in the cluster.

Resources can be inspected using:

```bash
kubectl get all -n hubflow
```

---

# 7. HubFlow Application

The application runs as a Kubernetes Deployment.

The Deployment maintains the desired number of application replicas.

Current configuration:

```text
Replicas: 2
Container Port: 3000
```

Architecture:

```text
             HubFlow Service
                    |
          +---------+---------+
          |                   |
          v                   v
     HubFlow Pod 1       HubFlow Pod 2
          |                   |
          +---------+---------+
                    |
                    v
                MySQL
```

Running multiple replicas provides basic application availability and allows Kubernetes to distribute traffic between the pods.

---

# 8. Kubernetes Service

The application is exposed through:

```text
hubflow-app
```

The Service selects pods using:

```text
app: hubflow-app
```

The application listens on:

```text
3000
```

The Service forwards traffic to:

```text
targetPort: 3000
```

For a cloud Kubernetes environment, the Service can use:

```text
type: LoadBalancer
```

to provision an external load balancer.

---

# 9. MySQL StatefulSet

MySQL is deployed using a Kubernetes StatefulSet instead of a normal Deployment.

This is appropriate because MySQL is a stateful workload.

The StatefulSet provides:

* Stable pod identity
* Stable storage association
* Ordered lifecycle management
* Persistent database storage

Current configuration:

```text
MySQL Version: 8.0
Port: 3306
Replicas: 1
```

---

# 10. MySQL Service

MySQL is exposed internally through:

```text
hubflow-db
```

The application connects to MySQL using Kubernetes DNS:

```text
hubflow-db:3306
```

The database connection is:

```text
mysql://hubflow_user:hubflow_pass@hubflow-db:3306/hubflow_db
```

The important difference from Docker Compose is that Kubernetes uses the Service name:

```text
hubflow-db
```

instead of the Docker Compose service name:

```text
db
```

---

# 11. Persistent Storage

MySQL data is stored using a:

```text
PersistentVolumeClaim
```

The application requests:

```text
10Gi
```

of persistent storage.

The storage is mounted inside MySQL at:

```text
/var/lib/mysql
```

Architecture:

```text
MySQL Container
      |
      v
/var/lib/mysql
      |
      v
PersistentVolumeClaim
      |
      v
PersistentVolume
      |
      v
Persistent Storage
```

This ensures that database data is not tied to the lifecycle of an individual MySQL container.

---

# 12. ConfigMap

Non-sensitive application configuration is stored in:

```text
hubflow-config
```

Examples:

```text
NODE_ENV=production
PORT=3000
JWT_EXPIRES_IN=1d
MYSQL_DATABASE=hubflow_db
MYSQL_USER=hubflow_user
```

ConfigMap is used because these values do not require secret protection.

---

# 13. Kubernetes Secret

Sensitive values are stored separately in:

```text
hubflow-secrets
```

Examples include:

```text
MYSQL_ROOT_PASSWORD
MYSQL_PASSWORD
JWT_SECRET
```

The application and MySQL containers consume these values through Kubernetes environment variables.

Secrets should not be committed to a public Git repository.

For a production environment, a dedicated secret-management solution such as AWS Secrets Manager or another external secret-management system would be preferable.

---

# Application-to-Database Communication

The application does not connect directly to a MySQL Pod IP.

Instead, it communicates through the Kubernetes Service.

```text
HubFlow Application
        |
        | DATABASE_URL
        |
        v
hubflow-db:3306
        |
        v
MySQL Service
        |
        v
MySQL StatefulSet
        |
        v
Persistent Storage
```

This provides a stable endpoint even if the MySQL Pod is recreated.

---

# Complete Deployment Flow

The complete deployment process is:

```text
Developer pushes code
        |
        v
Git Repository
        |
        v
Jenkins Pipeline
        |
        +--------------------+
        |                    |
        v                    v
   Docker Build          Terraform
        |                    |
        v                    v
Container Registry      Kubernetes
        |                    |
        +---------+----------+
                  |
                  v
          Application Deployment
                  |
          +-------+-------+
          |               |
          v               v
      App Pod 1       App Pod 2
          |               |
          +-------+-------+
                  |
                  v
             MySQL Service
                  |
                  v
           MySQL StatefulSet
                  |
                  v
          Persistent Storage
```

---

# Jenkins CD Pipeline

The Jenkins pipeline uses the following stages:

### 1. Checkout

Retrieves the latest source code from Git.

### 2. Build Docker Image

Builds the application container.

```bash
docker build -t hubflow:$BUILD_NUMBER .
```

### 3. Push Docker Image

Pushes the image to the container registry.

```text
hubflow:$BUILD_NUMBER
```

### 4. Terraform Init

Initializes Terraform providers and configuration.

```bash
terraform init
```

### 5. Terraform Validate

Checks Terraform configuration.

```bash
terraform validate
```

### 6. Terraform Plan

Generates the expected infrastructure changes.

```bash
terraform plan
```

The application image is passed dynamically:

```text
app_image=hubflow:$BUILD_NUMBER
```

### 7. Terraform Apply

Applies the Terraform configuration to Kubernetes.

```bash
terraform apply
```

### 8. Deployment Verification

Jenkins waits for the Kubernetes Deployment to complete:

```bash
kubectl rollout status deployment/hubflow-app -n hubflow
```

The pipeline then verifies:

```bash
kubectl get pods -n hubflow
kubectl get services -n hubflow
kubectl get deployment -n hubflow
```

---

# Repository Structure

The final repository structure is:

```text
hubflow/
│
├── Dockerfile
├── Jenkinsfile
├── README.md
│
├── src/
│   └── application source
│
├── package.json
│
└── terraform/
    │
    ├── providers.tf
    ├── variables.tf
    ├── terraform.tfvars
    ├── outputs.tf
    ├── namespace.tf
    ├── configmap.tf
    ├── secret.tf
    │
    ├── mysql/
    │   ├── pvc.tf
    │   ├── statefulset.tf
    │   └── service.tf
    │
    └── app/
        ├── deployment.tf
        └── service.tf
```

---

# Deployment Prerequisites

The following tools must be available on the Jenkins agent or deployment machine:

```text
Git
Docker
Terraform
kubectl
```

The Jenkins environment must also have access to the Kubernetes cluster.

Verify Kubernetes access:

```bash
kubectl get nodes
```

Verify Terraform:

```bash
terraform version
```

Verify Docker:

```bash
docker version
```

---

# Manual Terraform Deployment

Terraform can also be executed manually.

Navigate to:

```bash
cd terraform
```

Initialize:

```bash
terraform init
```

Validate:

```bash
terraform validate
```

Create a plan:

```bash
terraform plan
```

Apply:

```bash
terraform apply
```

---

# Kubernetes Verification

Check all resources:

```bash
kubectl get all -n hubflow
```

Check pods:

```bash
kubectl get pods -n hubflow
```

Check services:

```bash
kubectl get svc -n hubflow
```

Check persistent storage:

```bash
kubectl get pvc -n hubflow
```

Check application logs:

```bash
kubectl logs deployment/hubflow-app -n hubflow
```

Check MySQL logs:

```bash
kubectl logs statefulset/hubflow-mysql -n hubflow
```

---

# Rollout and Recovery

Kubernetes maintains the desired number of application replicas.

If an application Pod fails, Kubernetes can recreate it automatically.

The Deployment also supports controlled application rollouts.

Example:

```bash
kubectl rollout status deployment/hubflow-app -n hubflow
```

If necessary, the previous revision can be restored:

```bash
kubectl rollout undo deployment/hubflow-app -n hubflow
```

Because Docker images use build-specific tags, the deployment history can be associated with Jenkins build numbers.

For example:

```text
Jenkins Build 41
      ↓
hubflow:41

Jenkins Build 42
      ↓
hubflow:42
```

This makes application releases easier to trace.

---

# Security Considerations

The deployment separates sensitive and non-sensitive configuration.

### Non-sensitive

Stored in:

```text
ConfigMap
```

Examples:

```text
NODE_ENV
PORT
MYSQL_DATABASE
MYSQL_USER
```

### Sensitive

Stored in:

```text
Kubernetes Secret
```

Examples:

```text
MYSQL_ROOT_PASSWORD
MYSQL_PASSWORD
JWT_SECRET
```

For production deployments:

* Do not commit real secrets to Git.
* Do not use default passwords.
* Use a managed secret-management system.
* Use HTTPS for external traffic.
* Restrict Kubernetes RBAC permissions.
* Restrict database network access.
* Use immutable image tags.
* Regularly scan container images for vulnerabilities.

---

# Why Kubernetes?

Kubernetes provides several advantages over running the application directly with Docker Compose:

| Requirement              | Kubernetes Solution    |
| ------------------------ | ---------------------- |
| Application replicas     | Deployment             |
| Database state           | StatefulSet            |
| Persistent database data | PersistentVolumeClaim  |
| Service discovery        | Kubernetes Service     |
| Configuration            | ConfigMap              |
| Secrets                  | Secret                 |
| Self-healing             | Kubernetes controllers |
| Rolling deployments      | Deployment             |
| Scaling                  | Replica management     |
| External access          | LoadBalancer / Ingress |

---

# Why Terraform?

Terraform provides Infrastructure as Code.

Instead of manually creating Kubernetes resources, the desired environment is defined in version-controlled configuration.

This provides:

* Reproducibility
* Version control
* Reviewable infrastructure changes
* Consistent environments
* Automated deployment
* Reduced manual configuration

The architecture therefore combines:

```text
Terraform
    +
Kubernetes
    +
Docker
    +
Jenkins
```

to create an automated deployment workflow.

---

# Design Decisions

### Deployment instead of Pod

The application uses a Deployment so Kubernetes can maintain multiple replicas and perform rolling updates.

### StatefulSet instead of Deployment for MySQL

MySQL requires persistent state and stable storage, making StatefulSet more appropriate.

### Service instead of Pod IP

Services provide stable DNS and networking even when Pods are recreated.

### PersistentVolumeClaim for MySQL

Database data must survive Pod/container recreation.

### ConfigMap and Secret separation

Configuration and sensitive credentials are managed separately.

### Versioned Docker images

Build-specific image tags make releases traceable and support safer rollbacks.

### Terraform

Terraform makes the Kubernetes environment reproducible and manageable as code.

---

# Conclusion

The HubFlow deployment implements a complete containerized DevOps workflow:

```text
Code
 ↓
Git
 ↓
Jenkins
 ↓
Docker Build
 ↓
Container Registry
 ↓
Terraform
 ↓
Kubernetes
 ↓
Application Deployment
 ↓
MySQL StatefulSet
 ↓
Persistent Storage
```

The architecture provides automated deployment, application replication, persistent database storage, configuration management, secret management, health checks, and deployment verification.

It also provides a foundation that can be extended with:

* Kubernetes Ingress
* TLS/HTTPS
* Horizontal Pod Autoscaling
* Prometheus/Grafana monitoring
* Centralized logging
* AWS Secrets Manager
* CI security scanning
* Terraform remote state
* Kubernetes RBAC
* Network policies
* Managed MySQL such as Amazon RDS
