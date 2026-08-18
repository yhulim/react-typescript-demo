import './Filter.css'

type FilterProps = {
    term: string,
    onFilter: (term: string) => void
}

export const Filter = (props: FilterProps) => {
    return (
        <div className={'filter'}>
            <label>Filter: </label>
            <input type={'text'} onChange={(e) => props.onFilter(e.target.value)}/>
        </div>
    )
}