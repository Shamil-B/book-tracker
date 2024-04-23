from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import routes
from database.db import create_pool


app = FastAPI()

# we will allow cors for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    app.db_pool = await create_pool()


app.include_router(routes.router)
