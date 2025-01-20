"use client"

import useBooksStore from "@/app/stores/books"
import useWizformStore, { Element } from "@/app/stores/wizform"
import { WizformElementType } from "@/app/types/wizform"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { gql, useQuery } from "@apollo/client"
import { useShallow } from "zustand/shallow"

type EnabledElementsQuery = {
    elements: Element[]
}


function ElementFilter() {
    const currentBook = useBooksStore((state) => state.currentBook)
    const loadElements = useWizformStore((state) => state.loadElements)

    const elementsQuery = gql`{
        elements(bookId: "${currentBook}") {
            id,
            name,
            element
        }
    }`
    const {loading, error, data} = useQuery<EnabledElementsQuery>(elementsQuery)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    loadElements(data?.elements!)

    return <>
        <ElementFilterImpl/>
    </>

}


function ElementFilterImpl() {

    const [elements, setElementFilter] = useWizformStore(useShallow((state) => [state.elements, state.updateElementFilter]))

    async function elementFilterSelected(filter: WizformElementType) {
        setElementFilter(filter)
    }

    return (<>
        <Select onValueChange={elementFilterSelected}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wizform element" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem key={-1} value={WizformElementType.NONE}>Все стихиии</SelectItem>
                </SelectGroup>
                <SelectGroup>{elements.map((element, index) => (
                    <SelectItem key={index} value={element.element}>{element.name}</SelectItem>
                ))}</SelectGroup>
            </SelectContent>
        </Select>
    </>)
}

export default ElementFilter