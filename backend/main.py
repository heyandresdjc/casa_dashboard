import json
from typing import Union
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def read_root():
    with open('cache.json') as user_file:
        file_contents = user_file.read()
        return file_contents


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
