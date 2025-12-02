# 🚀 Quick Deployment Guide

## Local Development (2-Minute Setup)

```bash
# Terminal 1: Start Backend
npm install
npm start
# Runs on http://localhost:8080

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173 (auto-proxies /api to backend)
```

Visit: **http://localhost:5173**

---

## Docker Build

```bash
# Build
docker build -t fullstack-app:latest .

# Run
docker run -p 8080:8080 fullstack-app:latest

# Visit: http://localhost:8080
```

---

## Kubernetes Deploy

```bash
# Deploy
kubectl apply -f k8s/

# Monitor
kubectl get pods -w
kubectl logs -l app=fullstack-app -f

# Access
kubectl port-forward svc/fullstack-app 8080:80
# Visit: http://localhost:8080
```

---

## Fly.io Deploy (Easiest)

```bash
# Install CLI
curl -L https://fly.io/install.sh | sh

# Create app (first time only)
flyctl launch --name YOUR_APP_NAME

# Deploy
flyctl deploy

# Open
flyctl open
```

---

## GitHub Push

```bash
git add .
git commit -m "Add full-stack app with React, Vite, Express, and Kubernetes"
git push origin main
```

---

## What's Included

✅ **React + Vite** frontend with 5 components
✅ **Express.js** backend with CORS & health checks  
✅ **TailwindCSS** responsive design (mobile & desktop)
✅ **Multi-stage Docker** build (frontend compiled into backend)
✅ **Kubernetes manifests** (deployment, service, ingress)
✅ **Fly.io ready** (just run `flyctl deploy`)
✅ **API endpoints** (/api/data, /api/health)
✅ **Complete documentation** in README.md

---

## File Structure Summary

```
.
├── frontend/                     # React + Vite app
│   ├── src/components/          # 5 React components
│   ├── package.json             # Frontend deps
│   ├── vite.config.js           # Vite config
│   └── tailwind.config.js       # TailwindCSS config
├── server.js                     # Express backend
├── data.json                     # Sample API content
├── package.json                  # Backend deps
├── Dockerfile                    # Multi-stage build
├── k8s/                          # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
└── README.md                     # Full documentation
```

---

**All files ready to deploy!** 🎉
