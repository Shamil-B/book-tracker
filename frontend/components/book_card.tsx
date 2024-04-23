

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Book from "@/types/book";
import { FaTrash } from "react-icons/fa";

const BookCard: React.FC<{
    book: Book;
    deleteBook: (book: Book) => Promise<void>;
    updateStatus: (book: Book, status: string) => Promise<void>;
}> = ({ book, deleteBook, updateStatus }) => {
    return (
        <Card className="mb-3 min-w-[95%] mx-auto">
            <CardHeader className="px-2 md:px-6">
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <div className="text-lg md:text-xl">{book.title}</div>
                        <Button variant="link">
                            <FaTrash className="text-lg md:text-xl" onClick={() => deleteBook(book)} color="red" />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col justify-between item-center gap-4">
                <h1 className="font-semibold text-sm md:text-lg text-gray-600">Move To</h1>
                <div>
                    <div className="flex flex-col md:flex-row space-between gap-1">

                        {book.status !== "to-read" && (
                            <Button
                                variant="default"
                                onClick={() => updateStatus(book, "to-read")}
                            >
                                To Read
                            </Button>
                        )}
                        {book.status !== "in-progress" && (
                            <Button
                                variant="default"
                                onClick={() => updateStatus(book, "in-progress")}
                            >
                                In Progress
                            </Button>
                        )}
                        {book.status !== "completed" && (
                            <Button
                                variant="default"
                                onClick={() => updateStatus(book, "completed")}
                            >
                                Completed
                            </Button>
                        )}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BookCard;