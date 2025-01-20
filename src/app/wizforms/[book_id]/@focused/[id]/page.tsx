"use client"

import { WizformElementType } from "@/app/types/wizform";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

type Magic = {
    level: number
}

type Magics = {
    types: Magic[]
}

type FocusedWizform = {
    name: string,
    element: WizformElementType,
    magics: Magics
}

type FocusedWizformQuery = {
    wizform: FocusedWizform
}

function WizformFocused() {
    const {id} = useParams<{id: string}>()

    const wizformQuery = gql`
    {
        wizform(id: "${id}") {
            name,
            element,
            magics {
                types {
                    level
                }
            }
        }
    }
    `

    const {loading, error, data} = useQuery<FocusedWizformQuery>(wizformQuery)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return <>
        <h1>{data?.wizform.name}</h1>
        <h1>{data?.wizform.element}</h1>
    </>
}

export default WizformFocused