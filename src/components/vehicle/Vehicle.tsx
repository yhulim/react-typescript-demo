import './Vehicle.css';

type VehicleProps = {
    id: number,
    make: string,
    model: string,
    year: number,
    price: number | null,
    onEdit: (id: number) => void
}

export const Vehicle = (props: VehicleProps) => {
    return (
        <div className={'panel'}>
            <div className={'col'}>
                <div>{props.make}</div>
                <div>{props.model}</div>
                <div>{props.year}</div>
            </div>
            <div className={'price col'}>{props.price ? props.price : '-'}</div>
            <button className={'button col'} onClick={() => props.onEdit(props.id)}>Edit</button>
        </div>
    )
}