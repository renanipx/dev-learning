import aiosqlite
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

DATABASE = "database.db"

app = FastAPI()

# Data model for the Item
class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    on_sale: bool = False

# Connect to the database on startup
@app.on_event("startup")
async def startup():
    app.db_connection = await aiosqlite.connect(DATABASE)
    app.db_connection.row_factory = aiosqlite.Row
    await app.db_connection.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        on_sale BOOLEAN NOT NULL
    )
    """)
    await app.db_connection.commit()

# Disconnect from the database on shutdown
@app.on_event("shutdown")
async def shutdown():
    await app.db_connection.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the SimpleAPI Python with FastAPI and SQLite!"}

# CREATE: Create a new item
@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    async with app.db_connection.execute("SELECT id FROM items WHERE id = ?", (item.id,)) as cursor:
        if await cursor.fetchone():
            raise HTTPException(status_code=400, detail="Item with this ID already exists.")

    await app.db_connection.execute("INSERT INTO items (id, name, description, price, on_sale) VALUES (?, ?, ?, ?, ?)",
                                   (item.id, item.name, item.description, item.price, item.on_sale))
    await app.db_connection.commit()
    return item

# READ: List all items
@app.get("/items/", response_model=List[Item])
async def read_items():
    async with app.db_connection.execute("SELECT * FROM items") as cursor:
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]

# READ: Get a specific item by ID
@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    async with app.db_connection.execute("SELECT * FROM items WHERE id = ?", (item_id,)) as cursor:
        row = await cursor.fetchone()
        if row:
            return dict(row)
    raise HTTPException(status_code=404, detail="Item not found.")

# UPDATE: Update an existing item
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, updated_item: Item):
    async with app.db_connection.execute("SELECT id FROM items WHERE id = ?", (item_id,)) as cursor:
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Item not found.")

    await app.db_connection.execute("UPDATE items SET name = ?, description = ?, price = ?, on_sale = ? WHERE id = ?",
                                   (updated_item.name, updated_item.description, updated_item.price, updated_item.on_sale, item_id))
    await app.db_connection.commit()
    return updated_item

# DELETE: Remove an item
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    async with app.db_connection.execute("SELECT name FROM items WHERE id = ?", (item_id,)) as cursor:
        item = await cursor.fetchone()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found.")

    await app.db_connection.execute("DELETE FROM items WHERE id = ?", (item_id,))
    await app.db_connection.commit()
    return {"message": f"Item '{item['name']}' removed successfully."}
