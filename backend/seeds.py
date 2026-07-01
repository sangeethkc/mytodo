import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Todo

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost:5432/mydb")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(Todo).first():
        print("Seed data already exists. Skipping.")
        return
    todos = [
        Todo(text="Learn Docker", completed=False),
        Todo(text="Build a todo app", completed=True),
        Todo(text="Write tests", completed=False),
    ]
    db.add_all(todos)
    db.commit()
    print(f"Seeded {len(todos)} todos.")

if __name__ == "__main__":
    seed_database()
