from fastapi import FastAPI
from filter_model import filter

app = FastAPI()

@app.get('/')
def index():
    return {'key': 'value'}

@app.post('/filter')
def filter(msg):
    if len(msg) < 4:
        return {'isOutlier': True}
    return filter.filter_msg(msg)