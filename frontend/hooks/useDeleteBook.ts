import { deleteBook } from "@/services/book_service";
import Book from "@/types/book";
import { useState } from "react";

export function useDeleteBook() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const deleteBook_ = async (book: Book) => {
        if (!book.id) throw new Error("Book id is required")
        setIsSuccess(false);
        setIsError(false);
        setError(null);
        setIsLoading(true);
        try {
            await deleteBook(book.id);
            setIsSuccess(true);
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteBook_, isLoading, error, isSuccess, isError }
}