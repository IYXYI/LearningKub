# Kubernetes + Fly.io Ready Node.js App

A production-ready Node.js Express application with complete Kubernetes manifests, ready to deploy on Fly.io or any Kubernetes cluster.

## 📋 Project Structure

```
.
├── app.js                 # Express application
├── package.json           # Node.js dependencies
├── Dockerfile             # Multi-stage Docker build
├── .gitignore             # Git ignore rules
├── k8s/                   # Kubernetes manifests
│   ├── deployment.yaml    # Pod deployment config
│   ├── service.yaml       # Service (ClusterIP)
│   └── ingress.yaml       # Ingress controller (optional)
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for local development)
- Docker (for building the image)
- kubectl (for Kubernetes deployment)
- Fly.io CLI (for Fly.io deployment)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app locally:**
   ```bash
   npm start
   ```

   The app will be available at: `http://localhost:8080`

3. **Test the endpoint:**
   ```bash
   curl http://localhost:8080
   # Response: {"message":"Hello from Fly.io!"}
   
   curl http://localhost:8080/health
   # Response: {"status":"healthy"}
   ```

## 🐳 Docker Build & Run

### Build the Docker image

```bash
docker build -t kubernetes-flyio-app:latest .
```

### Run locally with Docker

```bash
docker run -p 8080:8080 kubernetes-flyio-app:latest
```

Test: `curl http://localhost:8080`

### Push to Docker Registry

**For Fly.io:**
```bash
docker tag kubernetes-flyio-app:latest registry.fly.io/YOUR_APP_NAME:latest
docker push registry.fly.io/YOUR_APP_NAME:latest
```

**For Docker Hub:**
```bash
docker tag kubernetes-flyio-app:latest YOUR_DOCKERHUB_USERNAME/kubernetes-flyio-app:latest
docker push YOUR_DOCKERHUB_USERNAME/kubernetes-flyio-app:latest
```

## ☸️ Kubernetes Deployment

### Deploy to a Kubernetes Cluster

**Apply all manifests:**
```bash
kubectl apply -f k8s/
```

**Or apply individually:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml  # Optional
```

### Monitor the Deployment

```bash
# Watch deployment status
kubectl get deployments -w

# Check pods
kubectl get pods

# View pod logs
kubectl logs -l app=kubernetes-flyio-app -f

# Describe deployment for details
kubectl describe deployment kubernetes-flyio-app
```

### Test the Service

**Using port-forward (ClusterIP):**
```bash
kubectl port-forward svc/kubernetes-flyio-app 8080:80
# Then test: curl http://localhost:8080
```

**Inside the cluster:**
```bash
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://kubernetes-flyio-app/
```

### Scale the Deployment

```bash
kubectl scale deployment kubernetes-flyio-app --replicas=3
kubectl get pods  # Verify 3 pods running
```

### Cleanup

```bash
kubectl delete -f k8s/
```

## 🪁 Fly.io Deployment

### Option 1: Using Fly CLI

1. **Install Fly CLI:** [https://fly.io/docs/getting-started/installing-flyctl/](https://fly.io/docs/getting-started/installing-flyctl/)

2. **Login to Fly:**
   ```bash
   flyctl auth login
   ```

3. **Create a new Fly app (if not already done):**
   ```bash
   flyctl launch --name YOUR_APP_NAME
   ```

4. **Build and deploy:**
   ```bash
   flyctl deploy
   ```

5. **View deployment status:**
   ```bash
   flyctl status
   flyctl logs
   ```

6. **Access your app:**
   ```bash
   flyctl open
   ```

### Option 2: Manual Docker Push & Fly.io Deploy

1. **Build and push image to Fly registry:**
   ```bash
   docker build -t registry.fly.io/YOUR_APP_NAME:latest .
   docker push registry.fly.io/YOUR_APP_NAME:latest
   ```

2. **Deploy using fly.toml:**
   Create or update `fly.toml`:
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

1. Go to [https://fly.io/dashboard](https://fly.io/dashboard)
2. Create a new app from the dashboard
3. Connect via web terminal
4. Clone this repo or upload files
5. Run:
   ```bash
   flyctl deploy
   ```

## 📊 Health Checks & Monitoring

The app includes Kubernetes probes for reliability:

- **Liveness Probe:** `/health` - Detects if the app is alive
- **Readiness Probe:** `/ready` - Detects if the app is ready to accept traffic

The Dockerfile includes a HEALTHCHECK for Docker:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', ...)"
```

## 🔧 Environment Variables

- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment (default: production)

Modify in `k8s/deployment.yaml` or set in Fly.io dashboard.

## 📦 Resource Limits

Kubernetes resource requests/limits (from `deployment.yaml`):
- **Requests:** 64Mi memory, 100m CPU
- **Limits:** 128Mi memory, 500m CPU

Adjust based on your application needs.

## 🔒 Security Best Practices

- Uses non-root Alpine images
- Multi-stage Docker build for minimal image size
- Resource limits enforced
- Health checks configured
- Readiness probes prevent traffic to unhealthy pods

## 🐛 Troubleshooting

### Pod stuck in Pending
```bash
kubectl describe pod POD_NAME
kubectl get events --sort-by='.lastTimestamp'
```

### CrashLoopBackOff
```bash
kubectl logs POD_NAME
kubectl describe pod POD_NAME
```

### Service not accessible
```bash
kubectl get svc
kubectl describe svc kubernetes-flyio-app
kubectl get endpoints
```

### Fly.io deployment fails
```bash
flyctl logs --follow
flyctl status
```

## 📚 Useful Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Fly.io Documentation](https://fly.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 📝 License

MIT

---

**Ready to deploy!** Push to GitHub and start deploying to Kubernetes or Fly.io. 🚀