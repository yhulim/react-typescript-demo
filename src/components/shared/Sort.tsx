import {SortField} from "../../model/model";
import './Sort.css'

type SortProps = {
    field: string,
    asc: boolean,
    sortFields: SortField[],
    onSortFieldUpdate: (sortField: string) => void,
    onSortAscUpdate: (sortAsc: boolean) => void
}

export const Sort = (props: SortProps) => {
    return (
        <div className="sort">
            <label>Sort: </label>
            <select className="sort-field" value={props.field} onChange={(e) => props.onSortFieldUpdate(e.target.value)}>
                {props.sortFields.map(sortField => (
                    <option key={sortField.code} value={sortField.code}>{sortField.label}</option>
                ))}
            </select>
            <select className="sort-asc" value={String(props.asc)} onChange={(e) => props.onSortAscUpdate(e.target.value === 'true')}>
                <option value="true">Asc</option>
                <option value="false">Desc</option>
            </select>
        </div>
    )
}