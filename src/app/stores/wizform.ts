import { create } from "zustand"
import { WizformElementType } from "../types/wizform"
import { gql, useQuery } from "@apollo/client"

export type Element = {
    id: string,
    name: string,
    element: WizformElementType
}

type Data = {
    elements: Element[],
    currentNameFilter: string,
    currentElementFilter: WizformElementType | null
}

type Action = {
    loadElements: (elements: Element[]) => void, 
    updateNameFilter: (filter: string) => void,
    updateElementFilter: (filter: WizformElementType | null) => void
}

const useWizformStore = create<Data & Action>((set) => ({
    elements: [],
    currentNameFilter: "",
    currentElementFilter: null,

    loadElements(elements) {
        set({elements: elements})
    },

    updateNameFilter(filter) {
        set({currentNameFilter: filter})
    },

    updateElementFilter(filter) {
        set({currentElementFilter: filter})    
    },
}))

export default useWizformStore