import { FaSpinner } from "react-icons/fa";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


export default function AddBook({ title, setTitle, addBook_, isAdding }: { title: string, setTitle: (title: string) => void, addBook_: (title: string) => void, isAdding: boolean }) {

    return <AlertDialog>
        <AlertDialogTrigger className="text-lg font-bold px-8 py-3 border border-gray-900/20 rounded-lg shadow-md hover:border-gray-900/50 transition delay-50">{isAdding ? <FaSpinner /> : "Add Book"}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="mb-6 w-full text-center text-2xl">Enter the Book's Title</AlertDialogTitle>
                <AlertDialogDescription>
                    <Input onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                    await addBook_(title);
                }}>Add</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}