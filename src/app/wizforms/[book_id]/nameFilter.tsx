"use client"

import useWizformStore from "@/app/stores/wizform";
import { Input } from "@/components/ui/input";
import { useDeferredValue, useEffect, useState } from "react";

function NameFilter() {

    const setNameFilter = useWizformStore((state) => state.updateNameFilter)
    const [currentInput, setCurrentInput] = useState<string>("")
    const deferredInput = useDeferredValue(currentInput)

    useEffect(() => {
        setNameFilter(deferredInput)
    }, [deferredInput])

    return (<>
        <Input
            onChange={(e) => setCurrentInput(e.currentTarget.value)}
        />
    </>)
}

export default NameFilter