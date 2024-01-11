import socket
import platform
from pydantic import BaseModel


def get_node_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]
    s.close()
    return ip


class Configuration(BaseModel):
    env: str
    main_location: str
    architecture: str = platform.architecture()[0]
    machine: str = platform.machine()
    node: str = platform.node()
    system: str = platform.system()
    ip_address: str = get_node_ip_address()
