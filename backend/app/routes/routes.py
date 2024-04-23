from fastapi import APIRouter
from models.models import Book
from repositories.repository import BookRepository
from pydantic import BaseModel
from typing import List


class Book(BaseModel):
    id: int | None = None
    title: str
    status: str | None = None


class Status(BaseModel):
    status: str


router = APIRouter()
repo = BookRepository()


@router.get("/books/")
async def get_books():
    return await repo.get_all()


@router.post('/books/')
async def create_book(book: Book):
    return await repo.create(book.title)


@router.patch('/books/{book_id}')
async def change_book_status(book_id: int, status: Status):
    return await repo.change_status(book_id, status.status)


@router.delete('/books/{book_id}')
async def delete_book(book_id: int):
    return await repo.delete(book_id)
