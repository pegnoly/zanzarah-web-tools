import useBooksStore from "@/app/stores/books";
import useWizformStore from "@/app/stores/wizform";
import { WizformElementType } from "@/app/types/wizform";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

function WizformFilters() {
    return (<>
        <ElementFilter/>
        <NameFilter/>
    </>)
}

function ElementFilter() {

    const [elements, elementFilter, setElementFilter] = useWizformStore(useShallow((state) => [
        state.elements,
        state.currentElementFilter, 
        state.updateElementFilter
    ]))

    async function elementFilterSelected(filter: WizformElementType) {
        setElementFilter(filter)
    }

    return (<>
        <Select onValueChange={elementFilterSelected}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
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

function NameFilter() {

    return (<></>)
}

export default WizformFilters