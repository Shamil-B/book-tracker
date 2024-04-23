import { getBooks } from "@/services/book_service";
import Book from "@/types/book";
import { useState } from "react";



export function useGetBooks() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    const getBooks_ = async () => {
        setIsSuccess(false);
        setIsError(false);
        setError(null);
        setIsLoading(true);
        try {
            const books = await getBooks();
            setBooks(books);
            setIsSuccess(true);
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { getBooks_, isLoading, error, isSuccess, isError, books }
}