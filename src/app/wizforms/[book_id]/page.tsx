"use client"

import { query } from "@/utils/graphql"
import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { use } from "react"

const wizformsQuery = gql`
{
    wizforms(bookId: "5a5247c2-273b-41e9-8224-491e02f77d8d", enabled: true, elementFilter: NEUTRAL_ONE) {
        name
    }
}
`

type wizform = {
    id: string,
    number: number,
    name: string
}

type wizformQueryParams = {
    bookId: string,
    enabled: boolean 
}

function Wizforms({params}: {params: {book_id: string} }) {
    
    const {book_id} = useParams() as { book_id: string}

    const {data} = useQuery<wizform[]>(wizformsQuery)

    console.log("data: ", data)

    return (<>
        <h1>{book_id}</h1>
        <ul>
            <li>
                <Link href="/wizform/test">Test wizform</Link>
            </li>
        </ul> 
    </>)
}

export default Wizforms