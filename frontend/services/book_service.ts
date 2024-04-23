

const baseApiUrl = 'http://localhost:8000';

export async function addBook(title: string) {
    const response = await fetch(`${baseApiUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
    });
    const data = await response.json();
    return data;
}

export async function deleteBook(id: number) {
    const response = await fetch(`${baseApiUrl}/books/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export async function updateBookStatus(id: number, status: string) {
    const response = await fetch(`${baseApiUrl}/books/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    });
    const data = await response.json();
    return data;
}

export async function getBooks() {
    const response = await fetch(`${baseApiUrl}/books`);
    const data = await response.json();
    return data;
}