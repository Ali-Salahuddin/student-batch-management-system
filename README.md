# student-batch-management-system
MERN-based Student &amp; Batch Management System with Docker containerization, Kubernetes deployments, NodePort services, and Helm-based orchestration.
## 🛠️ Technologies

- React + TypeScript
- Node.js
- Express.js
- MongoDB Atlas
- Docker
- Kubernetes
- Kind
- Helm
- Nginx
- Git & GitHub
- 
##DevOps architecture
React Frontend
      │
      ▼
Docker → Nginx
      │
      ▼
Kubernetes / Kind
      │
      ├── Frontend Service :31157
      │
      └── Backend Service :31156
                    │
                    ▼
              Node.js / Express
                    │
                    ▼
              MongoDB Atlas
