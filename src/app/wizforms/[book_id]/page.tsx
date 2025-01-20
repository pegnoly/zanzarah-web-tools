"use client"

import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import WizformsListWrapper from "./list"
import useBooksStore from "@/app/stores/books"
import useWizformStore, { Element } from "@/app/stores/wizform"
import WizfofmMain from "./main"
import { query } from "@/utils/graphql"
import { useShallow } from "zustand/shallow"

function Page({params} : { params : {book_id: string} }) {

    const {book_id} = useParams<{book_id: string}>()
    const [currentBook, setCurrentBook] = useBooksStore(useShallow((state) => [state.currentBook, state.setCurrentBook]))

    if (book_id != currentBook) {
        setCurrentBook(book_id)
    }

    return(
        <>
            <WizfofmMain/>
        </>
    )
}

export default Page