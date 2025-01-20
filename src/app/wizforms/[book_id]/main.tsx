"use client"

import useWizformStore, { Element } from "@/app/stores/wizform"
import WizformsListWrapper from "./list"
import useBooksStore from "@/app/stores/books"
import { gql, useQuery } from "@apollo/client"
import { useShallow } from "zustand/shallow"

interface WizformsSchema {
    bookId: string
}

function WizfofmMain(schema: WizformsSchema) {
    return (<>
        <WizformsListWrapper/>
    </>)
}

export default WizfofmMain