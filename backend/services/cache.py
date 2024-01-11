import json
from pathlib import Path


def set_json_file_caching(file_name: str, response: dict) -> dict|None:

    assert isinstance(file_name, str), "File name must be a string"
    assert isinstance(response, dict), "data must be in dictionary data type"

    with open(file_name, "w") as f:
        json.dump(response, f, indent=4)

    return response


def get_json_file_cache(file_name: str) -> dict|None:
    assert isinstance(file_name, str), "File name must be a string"
    try:
        with open(file_name) as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        return None


def delete_json_file_cache(file_name: str) -> None:
    assert isinstance(file_name, str), "File name must be a string"
    try:
        Path(file_name).unlink()
    except FileNotFoundError:
        pass
