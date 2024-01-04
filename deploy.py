import os
import shutil


def command_available(command: str = "git") -> bool:
    if shutil.which(command):
        return True
    else: 
        return False


def main(DEBUG: bool):
    if DEBUG:
        os.system("podman-compose down")
        os.system("podman-compose up --build")
    else:
        os.system("git pull")
        os.system("docker compose down --remove-orphans")
        os.system("DOCKER_BUILDKIT=0 docker compose up --build -d")


if __name__ == "__main__":
    if command_available("docker"):
        main(DEBUG=False)
    else:
        main(DEBUG=True)
