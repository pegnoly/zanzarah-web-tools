import { create } from "zustand"

type Data = {
    currentBook: string | null 
}

type Action = {
    setCurrentBook: (newBook: string | null) => void
}

const useBooksStore = create<Data & Action>((set) => ({
    currentBook: null,

    setCurrentBook(newBook) {
        set({currentBook: newBook})
    },
}))

export default useBooksStore