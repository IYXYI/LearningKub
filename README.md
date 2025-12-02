# Modern Full-Stack Web App - React + Vite + Express + Kubernetes

A production-ready full-stack web application with a React + Vite frontend and Express backend, complete with Kubernetes manifests and Fly.io deployment configuration.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser / Client                       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend (React + Vite)                                │
│  - Header with Navigation                              │
│  - Hero Section                                         │
│  - Feature Cards Grid                                   │
│  - Stats Section                                        │
│  - Footer                                               │
│  - Styled with TailwindCSS                             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ /api/* requests
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Backend (Express.js)                                   │
│  - Serves built frontend                               │
│  - /api/data - Returns feature/stats content           │
│  - /api/health - Health check endpoint                 │
│  - CORS enabled for cross-origin requests              │
└─────────────────────────────────────────────────────────┘
```

## 📋 Project Structure

```
.
├── frontend/                      # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   ├── index.css             # TailwindCSS styles
│   │   └── components/
│   │       ├── Header.jsx        # Navigation header
│   │       ├── Hero.jsx          # Hero section
│   │       ├── Features.jsx      # Feature cards grid
│   │       ├── Stats.jsx         # Stats showcase
│   │       └── Footer.jsx        # Footer
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # TailwindCSS config
│   └── postcss.config.js         # PostCSS config
│
├── server.js                      # Express backend server
├── data.json                      # Sample content data
├── package.json                   # Backend dependencies
├── Dockerfile                     # Multi-stage build
├── .gitignore                     # Git ignore rules
├── k8s/                           # Kubernetes manifests
│   ├── deployment.yaml           # Pod deployment
│   ├── service.yaml              # Service (ClusterIP)
│   └── ingress.yaml              # Ingress with path routing
└── README.md                      # This file
```

## 🚀 Quick Start - Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for building container)
- kubectl (for Kubernetes testing)

### 1. Install & Run Backend

```bash
# Install backend dependencies
npm install

# Start the backend server (runs on port 8080)
npm start

# In another terminal, you can test:
curl http://localhost:8080/api/data
curl http://localhost:8080/api/health
```

### 2. Install & Run Frontend (in separate terminal)

```bash
cd frontend

# Install frontend dependencies
npm install

# Start Vite dev server (runs on port 5173, proxies /api to port 8080)
npm run dev
```

Visit: **http://localhost:5173**

The frontend will automatically proxy API calls to `http://localhost:8080/api`

### 3. Build Frontend for Production

```bash
cd frontend
npm run build

# Built files go to: frontend/dist/
```

## 🐳 Docker Build & Deploy Locally

### Build Docker Image

```bash
# Build the image (multi-stage: builds frontend, then creates final image with backend)
docker build -t fullstack-app:latest .

# Check the image size
docker images | grep fullstack-app
```

### Run Locally with Docker

```bash
docker run -p 8080:8080 fullstack-app:latest

# Test
curl http://localhost:8080                    # Frontend
curl http://localhost:8080/api/data           # API
curl http://localhost:8080/api/health         # Health check
```

Visit: **http://localhost:8080**

### Push to Registry

**For Docker Hub:**
```bash
docker tag fullstack-app:latest YOUR_USERNAME/fullstack-app:latest
docker push YOUR_USERNAME/fullstack-app:latest
```

**For Fly.io Registry:**
```bash
docker tag fullstack-app:latest registry.fly.io/YOUR_APP_NAME:latest
docker push registry.fly.io/YOUR_APP_NAME:latest
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes Cluster

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or apply individually:
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

### Monitor Deployment

```bash
# Watch deployment status
kubectl get deployments -w

# Check running pods
kubectl get pods

# View logs from all pods
kubectl logs -l app=fullstack-app -f

# Describe the deployment
kubectl describe deployment fullstack-app

# Check service
kubectl get svc fullstack-app
```

### Test the Application

**Using port-forward:**
```bash
kubectl port-forward svc/fullstack-app 8080:80
# Visit: http://localhost:8080
```

**Using exec into a pod:**
```bash
# Get pod name
POD=$(kubectl get pods -l app=fullstack-app -o jsonpath='{.items[0].metadata.name}')

# Execute curl inside pod
kubectl exec -it $POD -- curl http://localhost:8080/api/data
```

**Using a debug pod:**
```bash
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://fullstack-app/api/data
```

### Scale the Deployment

```bash
kubectl scale deployment fullstack-app --replicas=3
kubectl get pods  # Should show 3 pods running
```

### Update the Image

```bash
# Update deployment with new image
kubectl set image deployment/fullstack-app \
  app=fullstack-app:v2 --record

# Check rollout status
kubectl rollout status deployment/fullstack-app

# View rollout history
kubectl rollout history deployment/fullstack-app

# Rollback if needed
kubectl rollout undo deployment/fullstack-app
```

### Cleanup

```bash
kubectl delete -f k8s/
# or
kubectl delete deployment,service,ingress fullstack-app
```

## 🪁 Fly.io Deployment

### Option 1: Using Fly CLI (Recommended)

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly:**
   ```bash
   flyctl auth login
   ```

3. **Create a new app (if not already created):**
   ```bash
   flyctl launch --name YOUR_APP_NAME
   ```

4. **Build and deploy:**
   ```bash
   flyctl deploy
   ```

5. **Monitor deployment:**
   ```bash
   flyctl status
   flyctl logs --follow
   ```

6. **Open the app:**
   ```bash
   flyctl open
   ```

### Option 2: Manual Push to Fly Registry

1. **Build and tag:**
   ```bash
   docker build -t registry.fly.io/YOUR_APP_NAME:latest .
   docker push registry.fly.io/YOUR_APP_NAME:latest
   ```

2. **Create fly.toml:**
   ```toml
   app = "YOUR_APP_NAME"
   
   [build]
   image = "registry.fly.io/YOUR_APP_NAME:latest"
   
   [[services]]
   internal_port = 8080
   protocol = "tcp"
   
   [services.ports]
   handlers = ["http"]
   port = 80
   
   [services.ports]
   handlers = ["tls", "http"]
   port = 443
   ```

3. **Deploy:**
   ```bash
   flyctl deploy
   ```

### Option 3: Web Terminal (Minimal Setup)

1. Go to [Fly.io Dashboard](https://fly.io/dashboard)
2. Create a new app
3. Connect via web terminal
4. Clone this repository or upload files
5. Run:
   ```bash
   flyctl deploy
   ```

## 🎨 Customization Guide

### Change Colors & Branding

Edit `frontend/src/components/*.jsx` and `frontend/src/index.css`:

```jsx
// Change header gradient (Header.jsx)
<header className="bg-gradient-to-r from-YOUR-COLOR-600 to-YOUR-COLOR-600">
```

**Available TailwindCSS colors:** `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `purple`, `pink`, etc.

### Update Content

Edit `data.json` to change features, stats, and titles:

```json
{
  "title": "Your Title",
  "description": "Your description",
  "features": [
    {
      "id": 1,
      "title": "Feature Title",
      "description": "Feature description",
      "icon": "⚡",
      "color": "bg-blue-100"
    }
  ]
}
```

### Modify Components

- **Header Navigation:** Edit `frontend/src/components/Header.jsx`
- **Hero Section:** Edit `frontend/src/components/Hero.jsx`
- **Feature Cards:** Edit `frontend/src/components/Features.jsx`
- **Stats Display:** Edit `frontend/src/components/Stats.jsx`
- **Footer:** Edit `frontend/src/components/Footer.jsx`

### Add New API Endpoints

Edit `server.js`:

```javascript
app.get('/api/new-endpoint', (req, res) => {
  res.json({ data: 'your data' });
});
```

### Add Images

Place images in `frontend/public/` and reference them in components:

```jsx
<img src="/image-name.jpg" alt="description" />
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serves frontend (index.html) |
| `/api/data` | GET | Returns feature/stats content (data.json) |
| `/api/health` | GET | Health check for probes |

## 🔒 Security Features

- ✅ CORS enabled for API requests
- ✅ Health checks configured for Kubernetes
- ✅ Resource limits set (128Mi memory, 256Mi limit)
- ✅ Liveness & readiness probes configured
- ✅ Multi-stage Docker build minimizes image size
- ✅ Production-grade Alpine Linux base image

## 📦 Resource Requirements

**Kubernetes Pod Resources:**
- **Requests:** 128Mi memory, 100m CPU
- **Limits:** 256Mi memory, 500m CPU

**Docker Image Size:** ~150MB (includes Node 18 + frontend build + backend)

Adjust in `k8s/deployment.yaml` based on your needs.

## 🐛 Troubleshooting

### Frontend not loading
```bash
# Check if backend is running and serving static files
curl -v http://localhost:8080/

# Check frontend build
ls frontend/dist/
```

### API returns 404
```bash
# Verify endpoint exists
curl http://localhost:8080/api/data

# Check server logs
npm start  # or docker logs <container>
```

### Kubernetes pod stuck in CrashLoopBackOff
```bash
# Check logs
kubectl logs POD_NAME

# Describe pod for details
kubectl describe pod POD_NAME

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

### Port already in use
```bash
# Find process using port 8080
lsof -i :8080
kill -9 PID
```

## 📚 Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18, Vite 5, TailwindCSS 3 |
| Backend | Node.js 18, Express 4 |
| Containerization | Docker (multi-stage build) |
| Orchestration | Kubernetes |
| Deployment | Fly.io |
| Styling | TailwindCSS + PostCSS |

## 🚀 Performance Tips

1. **Optimize Images:** Compress images before adding to `frontend/public/`
2. **Code Splitting:** Implement React.lazy() for large components
3. **Caching:** Add cache headers in Express for static files
4. **Monitoring:** Use `kubectl top` to monitor resource usage

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 8080 | Server port |
| `NODE_ENV` | production | Environment (development/production) |

## 🔗 Useful Commands Cheat Sheet

```bash
# Local Development
npm start                              # Backend
cd frontend && npm run dev             # Frontend

# Docker
docker build -t fullstack-app:latest . # Build
docker run -p 8080:8080 fullstack-app:latest  # Run

# Kubernetes
kubectl apply -f k8s/                  # Deploy
kubectl get pods                       # List pods
kubectl logs -l app=fullstack-app -f   # View logs
kubectl port-forward svc/fullstack-app 8080:80  # Port forward

# Fly.io
flyctl launch --name APP_NAME          # Create app
flyctl deploy                          # Deploy
flyctl open                            # Open app
flyctl logs -f                         # View logs
```

## 📄 License

MIT

---

**Ready to deploy! Push to GitHub and deploy to Fly.io or Kubernetes.** 🚀

For detailed Kubernetes documentation: https://kubernetes.io/docs/
For Fly.io docs: https://fly.io/docs/
For React docs: https://react.dev/
