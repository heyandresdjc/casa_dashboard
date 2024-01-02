git pull
docker compose down --remove-orphans
DOCKER_BUILDKIT=0 docker compose up --build -d