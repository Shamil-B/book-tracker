import { updateBookStatus } from "@/services/book_service";
import Book from "@/types/book";
import { useState } from "react";




export function useUpdateStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const updateStatus_ = async (id: number, status: string) => {
        if (!id) throw new Error("Book id is required")
        setIsSuccess(false);
        setIsError(false);
        setError(null);
        setIsLoading(true);
        try {
            await updateBookStatus(id, status);
            setIsSuccess(true);
        } catch (error: any) {
            setError(error.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateStatus_, isLoading, error, isSuccess, isError }
}