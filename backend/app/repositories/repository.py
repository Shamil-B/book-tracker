
from typing import List
from models.models import Book
from database.db import create_pool


class BookRepository:
    def __init__(self):
        self.connection = None

    async def create(self, title: str) -> Book:
        await self.create_connection()
        query = 'INSERT INTO books (title, status) VALUES ($1, $2) RETURNING *'
        row = await self.connection.fetchrow(query, title, 'to-read')
        return Book(id=row['id'], title=row['title'], status=row['status'])

    async def get_all(self) -> List[Book]:
        await self.create_connection()
        query = "SELECT * FROM books"
        rows = await self.connection.fetch(query)
        return [Book(id=row['id'], title=row['title'], status=row['status']) for row in rows]

    async def change_status(self, book_id: int, status: str) -> Book:
        await self.create_connection()
        query = "UPDATE books SET status = $1 WHERE id = $2 RETURNING *"
        row = await self.connection.fetchrow(query, status, book_id)
        return Book(id=row['id'], title=row['title'], status=row['status'])

    async def delete(self, book_id: int) -> Book:
        await self.create_connection()
        query = "DELETE FROM books WHERE id = $1 RETURNING *"
        row = await self.connection.fetchrow(query, book_id)
        return Book(id=row['id'], title=row['title'], status=row['status'])

    async def create_connection(self) -> None:
        if not self.connection:
            self.connection = await create_pool()
