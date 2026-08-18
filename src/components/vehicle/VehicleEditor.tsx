import {VehicleModel} from "../../model/model";
import {useState} from "react";

type VehicleEditorProps = {
    vehicle: VehicleModel,
    onSave: (vehicle: VehicleModel) => void
}

export const VehicleEditor = (props: VehicleEditorProps) => {

    const [price, setPrice] = useState(convertPriceToString(props.vehicle.price))

    return (
        <div className="vehicle-editor">
            <div className="input">
                <label>Price: </label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    )

    function handleSave() {
        props.onSave({
            ...props.vehicle,
            price: convertStringToPrice(price),
        });
    }

    function convertPriceToString(price: number | null): string {
        return price ? ('' + price) : '';
    }

    function convertStringToPrice(value: string): number | null {
        return value.trim() !== "" && !Number.isNaN(Number(value)) ? Number(value) : null
    }
}