"use client";

import BookCard from "@/components/book_card";
import Book from "@/types/book";
import { useGetBooks } from "@/hooks/useGetBooks";
import { useAddBook } from "@/hooks/useAddBook";
import { useEffect, useState } from "react";
import AddBook from "@/components/add_book";
import { useDeleteBook } from "@/hooks/useDeleteBook";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [title, setTitle] = useState<string>("");

  const { books, getBooks_, isLoading: isFetchingBooks, isError: isErrorFetchingBooks, error, isSuccess: isSuccessFetchingBooks } = useGetBooks();
  const { isLoading: isLoadingAddingBook, isError: isErrorAddingBook, isSuccess: isSuccessAddingBook, addBook_ } = useAddBook()
  const { isLoading: isLoadingDeletingBook, isError: isErrorDeletingBook, isSuccess: isSuccessDeletingBook, deleteBook_ } = useDeleteBook()
  const { isLoading: isLoadingUpdatingBook, isError: isErrorUpdatingBook, isSuccess: isSuccessUpdatingBook, updateStatus_ } = useUpdateStatus()
  const [booksToRead, setBooksToRead] = useState<Book[]>([]);
  const [booksInProgress, setBooksInProgress] = useState<Book[]>([]);
  const [booksCompleted, setBooksCompleted] = useState<Book[]>([]);


  useEffect(() => {
    if (isSuccessAddingBook) {
      getBooks_();
      setTitle("");
      toast.success("Book added successfully");
    }
    if (isErrorAddingBook) {
      toast.error("Error adding book");
    }
  }, [isSuccessAddingBook, isErrorAddingBook])

  useEffect(() => {
    if (isSuccessDeletingBook) {
      getBooks_();
      toast.success("Book deleted successfully");
    }
    if (isErrorDeletingBook) {
      toast.error("Error deleting book")
    }
  }, [isSuccessDeletingBook, isErrorDeletingBook])

  useEffect(() => {
    if (isSuccessUpdatingBook) {
      getBooks_();
      toast.success("Book status updated successfully");
    }
    if (isErrorUpdatingBook) {
      toast.error("Error updating book status")
    }
  }, [isSuccessUpdatingBook, isErrorUpdatingBook])

  useEffect(() => {
    if (isSuccessFetchingBooks) {
      const booksToRead = books.filter((book) => book.status == 'to-read');
      const booksInProgress = books.filter((book) => book.status == 'in-progress');
      const booksCompleted = books.filter((book) => book.status == 'completed');
      setBooksToRead(booksToRead);
      setBooksInProgress(booksInProgress);
      setBooksCompleted(booksCompleted);
    }
  }, [isSuccessFetchingBooks])

  useEffect(() => {
    getBooks_();
  }, [])

  return <div className="flex flex-col justify-center items-center pt-[2%] gap-8">
    <h1 className="text-2xl md:text-4xl font-bold">Read Trail</h1>
    <AddBook title={title} setTitle={setTitle} addBook_={addBook_} isAdding={isLoadingAddingBook} />
    <div className="flex mx-auto w-full justify-center flex-wrap">
      <div className="border-2 border-gray-700/10 rounded shadow-md min-w-[8rem] w-[22rem] flex flex-col gap-8 items-center max-h-[80vh] h-fit overflow-y-scroll border-b-2 border-gray-900/20 ml-2 relative mb-10">
        <h1 className="w-full text-xl md:text-2xl text-center px-4 py-3 font-bold text-gray-600 border-b-2 border-gray-900/20 sticky top-0 bg-white">Books To Read</h1>
        <div className="px-2">
          {isErrorFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-red-900/90">Failed to fetch books</div>}

          {isFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70"><FaSpinner /></div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksToRead.length == 0 && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70">No books here</div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksToRead.map((book) => {
            if (book.status == 'to-read') {
              return <BookCard key={book.id} book={book} deleteBook={async (book: Book) => { await deleteBook_(book) }} updateStatus={async (book: Book, status: string) => { await updateStatus_(book.id as number, status) }} />
            }
          })
          }
        </div>
      </div>
      <div className="border-2 border-gray-700/10 rounded shadow-md min-w-[8rem] w-[22rem] flex flex-col gap-8 items-center max-h-[80vh] h-fit overflow-y-scroll border-b-2 border-gray-900/20 ml-2 relative mb-10">
        <h1 className="w-full text-xl md:text-2xl text-center px-4 py-3 font-bold text-gray-600 border-b-2 border-gray-900/20 sticky top-0 bg-white">Books Reading</h1>
        <div className="px-2">
          {isErrorFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-red-900/90">Failed to fetch books</div>}

          {isFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70"><FaSpinner /></div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksInProgress.length == 0 && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70">No books here</div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksInProgress.map((book) => {
            if (book.status == 'in-progress') {
              return <BookCard key={book.id} book={book} deleteBook={async (book: Book) => { await deleteBook_(book) }} updateStatus={async (book: Book, status: string) => { await updateStatus_(book.id as number, status) }} />
            }
          })
          }
        </div>
      </div>
      <div className="border-2 border-gray-700/10 rounded shadow-md min-w-[8rem] w-[22rem] flex flex-col gap-8 items-center max-h-[80vh] h-fit overflow-y-scroll border-b-2 border-gray-900/20 ml-2 relative mb-10">
        <h1 className="w-full text-xl md:text-2xl text-center px-4 py-3 font-bold text-gray-600 border-b-2 border-gray-900/20 sticky top-0 bg-white">Books Read</h1>
        <div className="px-2">
          {isErrorFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-red-900/90">Failed to fetch books</div>}

          {isFetchingBooks && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70"><FaSpinner /></div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksCompleted.length == 0 && <div className="w-full px-2 text-center text-sm md:text-lg my-4 md:my-10 font-medium text-gray-900/70">No books here</div>}
          {!isFetchingBooks && !isErrorFetchingBooks && booksCompleted.map((book) => {
            if (book.status == 'completed') {
              return <BookCard key={book.id} book={book} deleteBook={async (book: Book) => { await deleteBook_(book) }} updateStatus={async (book: Book, status: string) => { await updateStatus_(book.id as number, status) }} />
            }
          })
          }
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
}