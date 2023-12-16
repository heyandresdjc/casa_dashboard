from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def read_root():
    with open('cache.json') as weather_file:
        file_contents = weather_file.read()
        return file_contents
