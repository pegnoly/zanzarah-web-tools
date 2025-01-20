import useBooksStore from "@/app/stores/books"
import useWizformStore from "@/app/stores/wizform"
import { gql, useQuery } from "@apollo/client"
import { useShallow } from "zustand/shallow"
import WizformFilters from "./filters"


function WizformsListWrapper() {

    const currentBookId = useBooksStore((state) => state.currentBook)
    const [currentElementFilter, currentNameFilter] = useWizformStore(useShallow((state) => [state.currentElementFilter, state.currentNameFilter]))

    return <>
        <WizformFilters/>
        <WizformsList bookId={currentBookId} elementFilter={currentElementFilter} nameFilter={currentNameFilter}/>
    </>
}

interface WizformsListSchema {
    bookId: string | null,
    elementFilter: string | null,
    nameFilter: string
}

type EnabledWizformData = {
    id: string,
    name: string,
    icon64: string
}

type EnabledWizformQuery = {
    wizforms: EnabledWizformData[]
}

function WizformsList(schema: WizformsListSchema) {

    const query = gql`{
        wizforms(bookId: "${schema.bookId}", enabled: true, elementFilter: ${schema.elementFilter}, nameFilter: "${schema.nameFilter}") {
            id,
            name,
            icon64
        }
    }`

    const {loading, error, data} = useQuery<EnabledWizformQuery>(query)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<>
        <ul>{data?.wizforms.map((wizform, index) => (
            <div key={index} style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <img width={40} height={40} src={`data:image/bmp;base64,${wizform.icon64}`}></img>
                {wizform.name}
            </div>
        ))}</ul>
    </>)
}

export default WizformsListWrapper