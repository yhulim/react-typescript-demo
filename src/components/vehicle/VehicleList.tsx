import {Vehicle} from "./Vehicle";
import {Filter} from "../shared/Filter";
import {Modal} from "../shared/Modal";
import React, {useEffect, useMemo, useState} from "react";
import {SortField, VehicleModel} from "../../model/model";
import {VehicleEditor} from "./VehicleEditor";
import {fetchVehicles} from "../../services/vehicleService";
import {Sort} from "../shared/Sort";
import {numberComparator, textComparator} from "../../util/comparator";

export const VehicleList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState<VehicleModel>();
    const [allVehicles, setAllVehicles] = useState<VehicleModel[] | null>(null);
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('PRICE')
    const [sortAsc, setSortAsc] = useState(false)

    useEffect(() => {
        fetchVehicles().then((fetched) => {
            setAllVehicles(fetched)
        });
    }, []);

    const visibleVehicles = useMemo(() => {
        if (!allVehicles) return null;
        const normalizedTerm = filter.trim().toLowerCase();
        const filtered = filterVehicles(allVehicles, normalizedTerm);
        return sortVehicles(filtered, sortField, sortAsc);
    }, [allVehicles, filter, sortField, sortAsc]);

    const sortFields: SortField[] = [
        { code: 'MAKE', label: 'Make' },
        { code: 'MODEL', label: 'Model' },
        { code: 'YEAR', label: 'Year' },
        { code: 'PRICE', label: 'Price' }
    ]

    return (
        <div>
            <Filter term={filter} onFilter={setFilter} />

            {visibleVehicles ? (
                visibleVehicles.length ? (
                    visibleVehicles.map((vehicle) => (
                        <Vehicle id={vehicle.id}
                                 key={vehicle.id}
                                 make={vehicle.make}
                                 model={vehicle.model}
                                 year={vehicle.year}
                                 price={vehicle.price}
                                 onEdit={openEditModal}
                        />
                    ))
                    ) : (
                    <div className="info">No Results</div>
                )
            ) : (
                <div className="info">Loading vehicles...</div>
            )}

            <Sort sortFields={sortFields} field={sortField} asc={sortAsc} onSortFieldUpdate={setSortField} onSortAscUpdate={setSortAsc}/>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {currentVehicle ? <VehicleEditor vehicle={currentVehicle} onSave={updateVehicle} /> : ''}
            </Modal>
        </div>
    );

    function filterVehicles(vehicles: VehicleModel[], normalized: string) {
        return vehicles?.filter((vehicle) =>
            vehicle.make.toLowerCase().includes(normalized) ||
            vehicle.model.toLowerCase().includes(normalized) ||
            String(vehicle.year).includes(normalized)
        );
    }

    function sortVehicles(vehicles: VehicleModel[], sortField: string, sortAsc: boolean) {
        const vehiclesCopy = [...vehicles]
        if ('PRICE' === sortField) return vehiclesCopy.sort((a, b) => numberComparator(a, b, sortAsc, v => v.price))
        if ('MAKE' === sortField) return vehiclesCopy.sort((a, b) => textComparator(a, b, sortAsc, v => v.make))
        if ('MODEL' === sortField) return vehiclesCopy.sort((a, b) => textComparator(a, b, sortAsc,v => v.model))
        if ('YEAR' === sortField) return vehiclesCopy.sort((a, b) => numberComparator(a, b, sortAsc,v => v.year))
        return vehiclesCopy.sort((a, b) => 0)
    }

    function openEditModal(vehicleId: number) {
        const vehicle = allVehicles?.find((v) => v.id === vehicleId);
        setCurrentVehicle(vehicle);
        setIsModalOpen(true);
    }

    function updateVehicle(vehicle: VehicleModel) {
        setAllVehicles((prev) =>
            prev ? prev.map((v) => (v.id === vehicle.id ? { ...vehicle } : v)) : prev );
        setCurrentVehicle(vehicle);
        setIsModalOpen(false);
    }
}