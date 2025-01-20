import { query } from "@/utils/graphql"
import { gql } from "@apollo/client"
import Link from "next/link"

type AvailableBook = {
    id: string,
    name: string
}

type AvailableBooksQuery = {
    books: AvailableBook[]
}

async function Page() {

    const booksQuery = gql`
    {
        books(available: true) {
            id,
            name
        }
    }
    `
    
    const {data} = await query<AvailableBooksQuery>({query: booksQuery}) 

    return (<>
        <h1>Books</h1>
        <ul>{data.books.map((book, index) => (
            <li>
                <Link href={`/wizforms/${book.id}`}>{book.name}</Link>
            </li>
        ))}</ul>
    </>)
}

export default Page