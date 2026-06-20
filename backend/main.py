from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Optional

# --- Database Setup ---
# NOTE: Ensure your user credentials match the PostgreSQL container/setup
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/mydb" 
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
Base = declarative_base()

app = FastAPI()

# Dependency to get database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Basic Root Endpoint ---
@app.get("/")
async def root():
    return {"message": "Backend API is running!"}