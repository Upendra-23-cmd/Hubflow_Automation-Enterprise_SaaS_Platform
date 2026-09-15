# Hubflow Automation

## Deployment Guide

This document provides the deployment procedure for the **Hubflow Automation** project, covering local Docker deployment, Kubernetes deployment, Terraform infrastructure management, and Jenkins-based CI/CD.

---

# 1. Deployment Architecture

```text
                         Developer
                             │
                             ▼
                      ┌─────────────┐
                      │   GitHub    │
                      └──────┬──────┘
                             │
                          Webhook
                             │
                             ▼
                     ┌──────────────┐
                     │    Jenkins   │
                     │              │
                     │ Build        │
                     │ Docker       │
                     │ Push         │
                     │ Terraform   │
                     │ Deploy       │
                     └──────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │   Docker     │      │  Terraform   │
          │   Registry   │      │     IaC      │
          └──────┬───────┘      └──────┬───────┘
                 │                     │
                 └──────────┬──────────┘
                            ▼
                 ┌──────────────────────┐
                 │ Kubernetes Cluster   │
                 │                      │
                 │ Namespace: hubflow   │
                 └──────────┬───────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       ┌──────────────┐            ┌──────────────┐
       │ Hubflow App  │            │    MySQL     │
       │ Deployment   │            │ StatefulSet  │
       │              │            │              │
       │ Pod 1        │            │ Database     │
       │ Pod 2        │            │              │
       └──────┬───────┘            └──────┬───────┘
              │                           │
              │                           ▼
              │                    ┌──────────────┐
              │                    │     PVC      │
              │                    │    10 Gi     │
              │                    └──────────────┘
              ▼
        Application Service
              │
              ▼
             Users
```

---

# 2. Prerequisites

Install the following tools before starting the deployment.

### Required

* Git
* Docker
* Docker Compose
* Node.js / npm
* kubectl
* Terraform

### For AWS deployment

* AWS CLI
* AWS account
* Kubernetes cluster such as Amazon EKS
* IAM permissions for the deployment

### For CI/CD

* Jenkins
* Docker Registry account
* GitHub repository
* Jenkins credentials for the required services

Verify the installations:

```bash
git --version
docker --version
docker compose version
kubectl version --client
terraform version
aws --version
```

---

# 3. Repository Structure

```text
hubflow/
│
├── frontend/
│
├── backend/
│
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── mysql-pvc.yaml
│   ├── mysql-statefulset.yaml
│   ├── mysql-service.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
│   └── ingress.yaml
│
├── terraform/
│   ├── main.tf
│   ├── providers.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── terraform.tfvars
│   └── modules/
│
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── .gitignore
└── README.md
```

---

# 4. Clone the Repository

Clone the project:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd hubflow
```

Verify the repository:

```bash
git status
```

---

# 5. Environment Configuration

The application requires configuration values for:

* Application port
* Database
* JWT authentication
* Database credentials
* Runtime environment

Example configuration:

```text
NODE_ENV=production
PORT=3000
MYSQL_DATABASE=hubflow_db
MYSQL_USER=hubflow_user
MYSQL_PASSWORD=<secure-password>
MYSQL_ROOT_PASSWORD=<secure-root-password>
JWT_SECRET=<secure-jwt-secret>
JWT_EXPIRES_IN=1d
```

### Important

Never commit real credentials to GitHub.

The following files should remain excluded:

```text
.env
terraform.tfvars
*.tfstate
*.pem
*.key
```

The repository `.gitignore` is configured to help prevent accidental commits of sensitive files.

---

# 6. Local Deployment Using Docker Compose

Docker Compose can be used to run the application and MySQL locally.

## Step 1 — Build the Application

```bash
docker compose build
```

## Step 2 — Start the Services

```bash
docker compose up -d
```

This starts:

```text
Hubflow Application
       │
       ▼
    MySQL
```

## Step 3 — Check Containers

```bash
docker compose ps
```

Expected services:

```text
app
db
```

## Step 4 — View Logs

Application logs:

```bash
docker compose logs -f app
```

Database logs:

```bash
docker compose logs -f db
```

All logs:

```bash
docker compose logs -f
```

## Step 5 — Access Application

Open:

```text
http://localhost:3000
```

## Step 6 — Stop the Deployment

```bash
docker compose down
```

To remove the database volume as well:

```bash
docker compose down -v
```

> Removing the volume permanently removes the local MySQL data.

---

# 7. Docker Image Deployment

Build the application image:

```bash
docker build -t hubflow:latest .
```

Run the image:

```bash
docker run -d \
  --name hubflow-app \
  -p 3000:3000 \
  hubflow:latest
```

Check:

```bash
docker ps
```

View logs:

```bash
docker logs -f hubflow-app
```

---

# 8. Push Docker Image to Registry

Authenticate with the configured container registry.

For Docker Hub:

```bash
docker login
```

Build the image:

```bash
docker build -t <dockerhub-username>/hubflow:latest .
```

Create a versioned image:

```bash
docker tag \
  <dockerhub-username>/hubflow:latest \
  <dockerhub-username>/hubflow:1.0.0
```

Push the image:

```bash
docker push <dockerhub-username>/hubflow:latest
```

```bash
docker push <dockerhub-username>/hubflow:1.0.0
```

Versioned tags are recommended because they make deployments traceable and allow easier rollback.

---

# 9. Kubernetes Deployment

The Kubernetes deployment uses the following resources:

```text
Namespace
   │
   ├── ConfigMap
   ├── Secret
   │
   ├── Hubflow Application
   │     ├── Pod 1
   │     └── Pod 2
   │
   ├── Application Service
   │
   ├── MySQL StatefulSet
   │
   ├── MySQL Service
   │
   └── PersistentVolumeClaim
```

---

# 10. Configure Kubernetes Access

Make sure kubectl is connected to the target Kubernetes cluster.

Check the current context:

```bash
kubectl config current-context
```

Check cluster connectivity:

```bash
kubectl cluster-info
```

Check nodes:

```bash
kubectl get nodes
```

The nodes should be in the `Ready` state.

---

# 11. Create Kubernetes Namespace

Create the Hubflow namespace:

```bash
kubectl apply -f k8s/namespace.yaml
```

Verify:

```bash
kubectl get namespace hubflow
```

---

# 12. Configure Kubernetes Secrets

Before deployment, update the Kubernetes Secret configuration with secure values.

The Secret contains sensitive values such as:

```text
MYSQL_ROOT_PASSWORD
MYSQL_PASSWORD
JWT_SECRET
```

Apply the Secret:

```bash
kubectl apply -f k8s/secret.yaml
```

Verify:

```bash
kubectl get secrets -n hubflow
```

> Do not expose Secret values using screenshots, Git commits, public repositories, or assessment documentation.

For production environments, an external secret management solution such as AWS Secrets Manager can be used instead of storing secrets directly in Kubernetes manifests.

---

# 13. Apply ConfigMap

Apply the non-sensitive application configuration:

```bash
kubectl apply -f k8s/configmap.yaml
```

Verify:

```bash
kubectl get configmap -n hubflow
```

---

# 14. Deploy MySQL Storage

Apply the PersistentVolumeClaim:

```bash
kubectl apply -f k8s/mysql-pvc.yaml
```

Check:

```bash
kubectl get pvc -n hubflow
```

Expected status:

```text
Bound
```

---

# 15. Deploy MySQL

Apply the StatefulSet:

```bash
kubectl apply -f k8s/mysql-statefulset.yaml
```

Apply the MySQL Service:

```bash
kubectl apply -f k8s/mysql-service.yaml
```

Check the StatefulSet:

```bash
kubectl get statefulset -n hubflow
```

Check MySQL pod:

```bash
kubectl get pods -n hubflow
```

Check MySQL service:

```bash
kubectl get svc -n hubflow
```

---

# 16. Deploy Hubflow Application

Before deployment, update the image in:

```text
k8s/app-deployment.yaml
```

Example:

```yaml
image: <dockerhub-username>/hubflow:1.0.0
```

Apply the Deployment:

```bash
kubectl apply -f k8s/app-deployment.yaml
```

Apply the Service:

```bash
kubectl apply -f k8s/app-service.yaml
```

Check the deployment:

```bash
kubectl get deployment -n hubflow
```

Check the pods:

```bash
kubectl get pods -n hubflow
```

---

# 17. Verify Application Rollout

Monitor the deployment:

```bash
kubectl rollout status deployment/hubflow-app -n hubflow
```

Expected result:

```text
deployment "hubflow-app" successfully rolled out
```

Check pod status:

```bash
kubectl get pods -n hubflow
```

Expected:

```text
NAME                            READY   STATUS
hubflow-app-xxxxxxxxxx-xxxxx    1/1     Running
hubflow-app-xxxxxxxxxx-xxxxx    1/1     Running
hubflow-mysql-0                 1/1     Running
```

---

# 18. Verify Kubernetes Services

Run:

```bash
kubectl get svc -n hubflow
```

The application Service should expose port:

```text
3000
```

The MySQL Service should expose:

```text
3306
```

---

# 19. Application-to-Database Communication

The application communicates with MySQL using the Kubernetes Service DNS name.

The database service is:

```text
hubflow-db
```

Therefore, the application connection follows:

```text
Hubflow App
     │
     ▼
hubflow-db:3306
     │
     ▼
MySQL StatefulSet
     │
     ▼
PersistentVolume
```

This avoids directly depending on the MySQL pod IP.

---

# 20. Ingress Deployment

If Nginx Ingress is configured in the Kubernetes cluster, apply:

```bash
kubectl apply -f k8s/ingress.yaml
```

Check:

```bash
kubectl get ingress -n hubflow
```

The Ingress routes external HTTP/HTTPS traffic to the Hubflow application Service.

```text
Internet
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

Update the hostname in `ingress.yaml` according to the actual deployment environment.

---

# 21. AWS Deployment

For AWS, the recommended Kubernetes architecture is Amazon EKS.

A simplified architecture is:

```text
                       AWS
                        │
                        ▼
                 ┌─────────────┐
                 │    EKS      │
                 │  Cluster    │
                 └──────┬──────┘
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
      Hubflow App Pods        MySQL
             │                     │
             │                     ▼
             │               Persistent Storage
             │
             ▼
       Load Balancer
             │
             ▼
          Internet
```

AWS CLI authentication:

```bash
aws configure
```

Verify AWS identity:

```bash
aws sts get-caller-identity
```

For an existing EKS cluster:

```bash
aws eks update-kubeconfig \
  --region <aws-region> \
  --name <cluster-name>
```

Verify:

```bash
kubectl get nodes
```

---

# 22. Terraform Deployment

Terraform manages the Kubernetes infrastructure as code.

Navigate to Terraform:

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

Format:

```bash
terraform fmt -recursive
```

Review changes:

```bash
terraform plan
```

Apply:

```bash
terraform apply
```

Confirm when prompted.

---

# 23. Terraform Outputs

After deployment:

```bash
terraform output
```

Outputs can be used to retrieve information such as:

```text
Namespace
Application Service
Database Service
Load Balancer
```

---

# 24. Terraform Destroy

To remove Terraform-managed resources:

```bash
terraform destroy
```

Confirm the operation only when you are certain that the resources can be removed.

> In production, database resources should have additional protection against accidental deletion.

---

# 25. Jenkins CI/CD Deployment

Jenkins automates the complete deployment process.

## Pipeline Flow

```text
Git Push
   │
   ▼
GitHub
   │
   ▼
Jenkins
   │
   ├── Checkout
   │
   ├── Docker Build
   │
   ├── Docker Login
   │
   ├── Docker Push
   │
   ├── Terraform Init
   │
   ├── Terraform Validate
   │
   ├── Terraform Plan
   │
   ├── Terraform Apply
   │
   ├── Kubernetes Rollout
   │
   └── Deployment Verification
   │
   ▼
Running Application
```

---

# 26. Jenkins Credentials

The Jenkins server should contain credentials for external systems.

Typical credentials include:

```text
dockerhub-credentials
```

for Docker Registry authentication.

Other credentials may include:

```text
AWS credentials
Kubernetes credentials
GitHub credentials
Terraform backend credentials
```

Credentials should be stored using the Jenkins Credentials Manager rather than directly inside the Jenkinsfile.

---

# 27. Jenkins Pipeline Stages

The `Jenkinsfile` performs the following operations.

### 1. Checkout

```text
GitHub → Jenkins Workspace
```

### 2. Docker Build

```text
Source Code → Docker Image
```

### 3. Image Tagging

A build-specific image tag is generated.

Example:

```text
hubflow:42
```

### 4. Registry Push

The image is pushed to the configured container registry.

### 5. Terraform Initialization

```bash
terraform init
```

### 6. Terraform Validation

```bash
terraform validate
```

### 7. Terraform Plan

```bash
terraform plan
```

### 8. Terraform Apply

```bash
terraform apply
```

### 9. Kubernetes Rollout

The pipeline waits for the application deployment to become ready.

### 10. Verification

The pipeline checks:

```text
Pods
Deployment
Services
Rollout status
```

---

# 28. Versioned Deployment

Each Jenkins build should generate a unique image version.

Example:

```text
Build 40 → hubflow:40
Build 41 → hubflow:41
Build 42 → hubflow:42
```

This provides deployment traceability.

Instead of:

```text
hubflow:latest
```

the Kubernetes deployment can use:

```text
hubflow:42
```

This makes it clear which application version is running.

---

# 29. Rollback

If a new deployment fails, Kubernetes can roll back to the previous revision.

Check rollout history:

```bash
kubectl rollout history deployment/hubflow-app -n hubflow
```

Rollback:

```bash
kubectl rollout undo deployment/hubflow-app -n hubflow
```

Monitor:

```bash
kubectl rollout status deployment/hubflow-app -n hubflow
```

Verify:

```bash
kubectl get pods -n hubflow
```

---

# 30. Troubleshooting

## Check All Resources

```bash
kubectl get all -n hubflow
```

## Check Pod Details

```bash
kubectl describe pod <pod-name> -n hubflow
```

## Check Application Logs

```bash
kubectl logs <pod-name> -n hubflow
```

Follow logs:

```bash
kubectl logs -f <pod-name> -n hubflow
```

## Check Previous Container Logs

If a container restarted:

```bash
kubectl logs <pod-name> -n hubflow --previous
```

## Check Events

```bash
kubectl get events -n hubflow --sort-by=.lastTimestamp
```

## Check Deployment

```bash
kubectl describe deployment hubflow-app -n hubflow
```

## Check MySQL

```bash
kubectl describe statefulset hubflow-mysql -n hubflow
```

---

# 31. Common Deployment Issues

## ImagePullBackOff

Check:

```bash
kubectl describe pod <pod-name> -n hubflow
```

Possible causes:

* Incorrect image name
* Incorrect image tag
* Private registry authentication issue
* Image does not exist

---

## CrashLoopBackOff

Check application logs:

```bash
kubectl logs <pod-name> -n hubflow
```

Check:

* Environment variables
* Database connection
* Application configuration
* Application startup errors

---

## Database Connection Failure

Verify MySQL:

```bash
kubectl get pods -n hubflow
```

Verify service:

```bash
kubectl get svc -n hubflow
```

Expected database service:

```text
hubflow-db
```

Check MySQL logs:

```bash
kubectl logs hubflow-mysql-0 -n hubflow
```

---

## Pending PVC

Check:

```bash
kubectl get pvc -n hubflow
```

Then:

```bash
kubectl describe pvc mysql-data -n hubflow
```

Possible causes:

* No available storage class
* Insufficient storage
* AWS EBS/storage configuration issue
* Access mode incompatibility

---

# 32. Security Recommendations for Production

For a real production deployment, the following improvements are recommended.

### Secrets

Use:

```text
AWS Secrets Manager
```

or another dedicated secret management system.

### TLS

Configure HTTPS through the Nginx Ingress.

### Container Security

Use:

* Minimal base images
* Non-root containers
* Vulnerability scanning
* Image signing

### Kubernetes Security

Implement:

* RBAC
* Network Policies
* Pod Security Standards
* Resource quotas
* Least-privilege service accounts

### Database

For production AWS deployments, consider using:

```text
Amazon RDS for MySQL
```

instead of running the primary production database directly inside the application Kubernetes cluster.

---

# 33. Production Monitoring

A production deployment should include monitoring for:

```text
Application Health
CPU
Memory
Pod Restarts
Request Rate
Error Rate
Database Health
Disk Usage
Network Traffic
```

Potential monitoring stack:

```text
Prometheus
     │
     ▼
Grafana
```

Centralized logs can also be implemented using an appropriate logging stack or AWS-native services.

---

# 34. Deployment Verification Checklist

Before considering the deployment complete, verify:

```text
[ ] Git repository is accessible
[ ] Docker image builds successfully
[ ] Docker image is pushed to registry
[ ] Kubernetes cluster is accessible
[ ] Hubflow namespace exists
[ ] ConfigMap exists
[ ] Secrets exist
[ ] MySQL StatefulSet is running
[ ] MySQL PVC is Bound
[ ] MySQL Service exists
[ ] Application Deployment is running
[ ] Application pods are Ready
[ ] Application Service exists
[ ] Ingress is configured
[ ] Application is reachable
[ ] Jenkins pipeline succeeds
[ ] Terraform plan succeeds
[ ] Terraform apply succeeds
[ ] Rollout verification succeeds
```

---

# 35. Complete Deployment Command Summary

For a manual Kubernetes deployment:

```bash
# Namespace
kubectl apply -f k8s/namespace.yaml

# Configuration
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# Database
kubectl apply -f k8s/mysql-pvc.yaml
kubectl apply -f k8s/mysql-statefulset.yaml
kubectl apply -f k8s/mysql-service.yaml

# Application
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml

# Ingress
kubectl apply -f k8s/ingress.yaml

# Verification
kubectl get all -n hubflow
kubectl get pvc -n hubflow
kubectl rollout status deployment/hubflow-app -n hubflow
```

---

# 36. Terraform Command Summary

```bash
cd terraform

terraform init

terraform fmt -recursive

terraform validate

terraform plan

terraform apply
```

For cleanup:

```bash
terraform destroy
```

---

# 37. Jenkins Deployment Summary

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
Jenkins
    │
    ├── Checkout
    ├── Docker Build
    ├── Docker Push
    ├── Terraform Init
    ├── Terraform Validate
    ├── Terraform Plan
    ├── Terraform Apply
    ├── Kubernetes Rollout
    └── Verification
    │
    ▼
Production Deployment
```

---

# 38. Final Architecture

The final deployment approach combines application development and infrastructure automation:

```text
┌──────────────────────────────────────────────────────────────┐
│                         Hubflow                              │
│                                                              │
│ React / Next.js → Node.js → Java / Python / C / C++ Services│
│                              │                               │
│                       MySQL / PostgreSQL / Redis             │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
                            Docker
                               │
                               ▼
                         Container Registry
                               │
                               ▼
                            Jenkins
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
              Terraform                 Kubernetes
                  │                         │
                  └────────────┬────────────┘
                               ▼
                       Production Platform
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
                Application           Database
                  Pods              + Persistent
                                    Storage
```

---

# 39. Conclusion

The Hubflow deployment architecture demonstrates an end-to-end DevOps workflow:

**Code → GitHub → Jenkins → Docker → Container Registry → Terraform → Kubernetes → Application**

The design provides:

* Reproducible deployments
* Containerized application delivery
* Infrastructure as Code
* Automated CI/CD
* Kubernetes orchestration
* Persistent database storage
* Versioned deployments
* Rollback capability
* Separation of configuration and secrets
* A foundation for AWS production deployment

The architecture can be further extended with managed AWS services, autoscaling, centralized monitoring, external secret management, automated security scanning, and production-grade database infrastructure.
