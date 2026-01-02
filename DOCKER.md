# Docker: Build & Run ✅

This project is containerized with a multistage `Dockerfile` (builder using Node and runtime using nginx) and includes `docker-compose` files for development and production.

Build the production static assets locally:

```sh
npm install
npm run build
```

Build and run the Docker image:

```sh
# Build image (tags: apsis:latest)
docker build -t apsis:latest .

# Run container and expose on localhost:8080
docker run --rm -p 8080:80 apsis:latest
```

Use Docker Compose for a one-step production run:

```sh
docker compose up --build -d
# Open http://localhost:8080
```

Run a local development container with hot reload:

```sh
# Uses the vite dev server on port 5173
docker compose -f docker-compose.dev.yml up
# Open http://localhost:5173
```

If you'd like, I can add a GitHub Actions workflow to build and publish the image — tell me which registry (Docker Hub / GitHub Container Registry / Azure / GCR) to use and I’ll scaffold it.
