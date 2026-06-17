from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import util

app = FastAPI(title="Bangalore Home Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    total_sqft: float
    location: str
    bhk: int
    bath: int

@app.on_event("startup")
def startup_event():
    util.load_saved_artifacts()

@app.get("/get_location_names")
def get_location_names():
    return {"locations": util.get_location_names()}

@app.post("/predict_home_price")
def predict_home_price(data: PredictionRequest):
    estimated_price = util.get_estimated_price(
        data.location, data.total_sqft, data.bhk, data.bath
    )
    return {"estimated_price": estimated_price}