from .cache import set_json_file_caching, get_json_file_cache


def set_configuration(file_name: str, response: dict) -> None:
    return set_json_file_caching(file_name, response)


def get_configuration(file_name: str) -> dict:
    return get_json_file_cache(file_name)
