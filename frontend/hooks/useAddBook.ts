import { addBook } from "@/services/book_service";
import { useState } from "react";


export function useAddBook() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const addBook_ = async (title: string) => {
        setIsSuccess(false);
        setIsError(false);
        setError(null);
        setIsLoading(true);
        try {
            await addBook(title);
            setIsSuccess(true);
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { addBook_, isLoading, error, isSuccess, isError }
}