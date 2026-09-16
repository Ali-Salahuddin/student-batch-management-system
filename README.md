
🎓 Student & Batch Management System
A production-style MERN Stack application designed to showcase modern full-stack development and DevOps practices.
The application is containerized using Docker, deployed on Kubernetes (Kind), and packaged with a reusable Helm chart. The backend connects securely to MongoDB Atlas, while the frontend is served via Nginx.
________________________________________
🚀 Project Overview
This project demonstrates the end-to-end lifecycle of a modern web application, from development and containerization to Kubernetes orchestration and Helm-based deployment.
Application Stack
React + TypeScript
│
▼
Nginx
│
▼
Kubernetes
│
┌────┴────┐
│ │
Frontend Backend
:31157 :31156
│
▼
MongoDB Atlas
________________________________________
✨ Key Features
•	👨🎓 Student management and administration
•	👨🏫 User and role-based access management
•	📚 Batch creation and management
•	🔐 Authentication and authorization
•	🍪 JWT authentication using secure HTTP cookies
•	🖼️ Profile image upload and retrieval
•	🗄️ MongoDB Atlas integration
•	⚛️ React + TypeScript frontend
•	🚀 Node.js + Express backend services
•	🐳 Docker-based containerization
•	☸️ Kubernetes orchestration with Kind
•	⎈ Helm chart deployment and management
•	🌐 Nginx-powered frontend hosting
•	🔒 Kubernetes Secrets for sensitive configuration
________________________________________
🏗️ DevOps Architecture
This solution follows a production-oriented architecture where frontend and backend services run as independent Kubernetes workloads and communicate securely with a cloud-hosted MongoDB database.
________________________________________
🐳 Docker
Both frontend and backend applications are packaged as Docker images using multi-stage builds, ensuring smaller image sizes and optimized production deployments.
Backend Image
proj-backend:latest
Build Flow
Node.js Build Stage
│
├── Install Dependencies
├── TypeScript Compilation
└── dist/
│
▼
Production Runtime
│
└── Node.js :4000
Frontend Image
proj-frontend:latest
Build Flow
Node.js Build Stage
│
├── Install Dependencies
└── Production Build
│
▼
dist/
│
▼
Nginx Runtime
:80
________________________________________
☸️ Kubernetes Deployment
The application is deployed to a Kind Kubernetes Cluster within a dedicated namespace.
Backend
Deployment : proj-backend
Service : proj-backend-service
Port : 4000
NodePort : 31156
Frontend
Deployment : proj-frontend
Service : proj-frontend-service
Port : 80
NodePort : 31157
________________________________________
🔐 Kubernetes Secrets
Sensitive configuration such as database connection strings and JWT secrets are managed using Kubernetes Secrets, keeping credentials separate from application manifests and source control.
⚠️ Never store .env files, database credentials, API keys, or JWT secrets in public repositories.
________________________________________
⎈ Helm
All Kubernetes resources are packaged into a reusable and configurable Helm chart, enabling consistent deployments across environments.
________________________________________
🌐 Application Access
After deployment, the application is accessible through Kubernetes NodePort services:
Frontend
http://localhost:31157
Backend
http://localhost:31156
Backend API
http://localhost:31156/auth/login
________________________________________
🔄 Deployment Workflow
Developer
│
▼
GitHub Repository
│
▼
Source Code
│
▼
Docker Image Build
│
├── proj-backend:latest
└── proj-frontend:latest
│
▼
Kind Cluster
│
▼
Load Images into Cluster
│
▼
Helm Deployment
│
▼
Kubernetes Resources
│
├── Deployments
├── Services
└── Secrets
│
▼
Running Application
________________________________________
🎯 Skills Demonstrated
Full-Stack Development
•	MERN Stack Development
•	RESTful API Design
•	Authentication & Authorization
•	React + TypeScript
•	Node.js & Express.js
•	MongoDB & Mongoose
•	File Upload Management
Containerization
•	Docker
•	Multi-Stage Builds
•	Production Image Optimization
•	Image Lifecycle Management
Kubernetes
•	Kind Clusters
•	Deployments & Pods
•	Services & Networking
•	Namespaces
•	Secrets Management
•	Service Discovery
•	Application Troubleshooting
Helm
•	Chart Development
•	Template Management
•	Parameterized Deployments
•	Release Lifecycle Management
•	Chart Validation & Testing
DevOps
•	Container Orchestration
•	Infrastructure Automation
•	Configuration Management
•	Deployment Strategies
•	Environment Management
•	Kubernetes Networking
•	Git & GitHub Workflows
________________________________________
📈 Future Enhancements
•	CI/CD pipelines with GitHub Actions
•	Container registry integration and image versioning
•	Kubernetes Ingress Controller
•	HTTPS/TLS support
•	Persistent storage for uploaded assets
•	ConfigMap-based application configuration
•	Horizontal Pod Autoscaling (HPA)
•	Resource requests and limits
•	Liveness and readiness probes
•	Prometheus monitoring
•	Grafana dashboards
•	Centralized logging
•	Cloud-native deployment on AWS, Azure, or GCP
________________________________________
👨💻 Project Goal
The primary objective of this project is to demonstrate the complete software delivery lifecycle, from full-stack application development to containerized deployment on Kubernetes.
This project showcases how modern development and DevOps practices work together to deliver scalable, maintainable, and production-ready applications.
MERN Stack
↓
Docker
↓
Kubernetes (Kind)
↓
Helm
↓
Production-Ready Deployment
________________________________________
⭐ Tech Stack
MERN Stack • Docker • Kubernetes • Kind • Helm • Nginx • MongoDB Atlas
A practical full-stack and DevOps project demonstrating modern application development, containerization, orchestration, and deployment best practices.

