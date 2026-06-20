from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --- Database Setup (Duplicated for encapsulation) ---
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/mydb" 
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(100), unique=True)

def seed_database():
    """Populates the database with initial sample user data."""
    from sqlalchemy.orm import Session # Need to redefine this for standalone execution if run as a script

    db: Session = engine.begin()
    
    # Check if users already exist to prevent insertion errors on re-run
    print("Checking existing users...")
    existing_users = db.execute(f"SELECT email FROM users").fetchall()
    if any(row[0] for row in existing_users):
        print("Seed data already exists. Skipping seed.")
        return

    print("Inserting initial seed data...")
    # Insert sample users using bulk operation for efficiency
    user_data = [
        {"name": "Alice", "email": "alice@example.com"},
        {"name": "Bob", "email": "bob@example.com"}
    ]

    stmt = User.__table__.insert()
    db.execute(stmt, [*user_data])
    db.commit()
    print("✅ Database seeded successfully!")