"use client"

import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import WizformsListWrapper from "./list"
import useBooksStore from "@/app/stores/books"
import useWizformStore, { Element } from "@/app/stores/wizform"

type EnabledElementsQuery = {
    elements: Element[]
}

function Page() {
    const {book_id} = useParams<{book_id: string}>()
    const setCurrentBook = useBooksStore((state) => state.setCurrentBook)

    setCurrentBook(book_id)

    return(
        <>
            <Wizforms bookId={book_id}/>
        </>
    )
}

interface WizformsSchema {
    bookId: string
}

function Wizforms(schema: WizformsSchema) {

    const loadElements = useWizformStore((state) => state.loadElements)

    const elementsQuery = gql`{
        elements(bookId: "${schema.bookId}") {
            id,
            name,
            element
        }
    }`

    const {loading, error, data} = useQuery<EnabledElementsQuery>(elementsQuery)
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    loadElements(data?.elements!)


    return (<>
        <WizformsListWrapper/>
    </>)
}

export default Page