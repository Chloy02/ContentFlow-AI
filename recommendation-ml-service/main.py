from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from recommender import Recommender

app = FastAPI(title="Recommendation ML Service")

# Initialize recommender
rec = Recommender()

class ItemIdList(BaseModel):
    itemIds: List[str] # Changed to str to support titles/Google IDs

@app.on_event("startup")
async def startup_event():
    rec.load_data()
    rec.train_item_based_model()

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/recommend/global")
def get_global_recommendations(limit: int = 10):
    return rec.get_global_recommendations(limit)

@app.get("/recommend/user/{user_id}")
def get_user_recommendations(user_id: int, limit: int = 10):
    return rec.get_user_recommendations(user_id, limit)

@app.post("/recommend/by-items")
def get_recommendations_by_items(payload: ItemIdList, limit: int = 10):
    return rec.get_recommendations_by_items(payload.itemIds, limit)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
