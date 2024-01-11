import subprocess
import platform
import logging


logger = logging.getLogger(__name__)


def get_active_processes():

    command = ""

    if platform.system() == "Windows":
        command = "tasklist"
    elif platform.system() == "Linux":
        command = "ps aux"
    elif platform.system() == "Darwin":
        command = "ps aux"

    output = subprocess.check_output(command, shell=True, text=True)
    output = output.split("\n")

    headers = output[0].split()

    results = []

    for index in range(len(output)):
        if index > 0:
            results.append({
                i[0]: i[1] for i in zip(headers, output[index].split())
            })

    return results


def mem_transform(size: int):
    return ((size/1024)/1024)/1024
