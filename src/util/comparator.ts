import {VehicleModel} from "../model/model";

export function numberComparator(a: VehicleModel, b: VehicleModel, sortAsc: boolean, fieldExtractor: (v: VehicleModel) => number | null) {
    const aEffectivePrice = fieldExtractor(a) || 0
    const bEffectivePrice = fieldExtractor(b) || 0
    return sortAsc ? aEffectivePrice - bEffectivePrice : bEffectivePrice - aEffectivePrice
}

export function textComparator(a: VehicleModel, b: VehicleModel, sortAsc: boolean, fieldExtractor: (v: VehicleModel) => string) {
    const aEffectiveText = fieldExtractor(a).trim().toLowerCase()
    const bEffectiveText = fieldExtractor(b).trim().toLowerCase()
    const cmp = aEffectiveText.localeCompare(bEffectiveText);
    return sortAsc ? cmp : -cmp;
}