export type VehicleModel = {
    id: number,
    make: string,
    model: string,
    year: number,
    price: number | null,
}

export type SortField = {
    code: string,
    label: string
}