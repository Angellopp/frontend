"use client";
import { Button, Popover } from "flowbite-react";
import PropTypes from "prop-types";
import useProductStock from "../../hooks/products/useProductStock";

export default function PopoverStock({ dataToPopover }) {
    // Obtener los datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const parsedCompaniesIds = userData && userData.available_companies_ids ? userData.available_companies_ids : [];
    const { data: productStock, isLoading, isError } = useProductStock(dataToPopover.id, parsedCompaniesIds || []);

    // Verificar si parsedCompaniesIds tiene contenido válido
    if (!parsedCompaniesIds || parsedCompaniesIds.length === 0) {
        return (
            <div>
                No companies available. Please check your settings.
            </div>
        );
    }

    // Llamar a useProductStock para obtener información de stock

    // Mostrar estado de carga
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Manejar errores en la obtención de stock
    if (isError) {
        return <div>Error fetching stock information</div>;
    }

    // Mostrar popover con la información de stock obtenida
    return (
        <Popover
            aria-labelledby="profile-popover"
            trigger="hover"
            content={
                <div className="w-64 p-3">
                    <p
                        id="profile-popover"
                        className="text-gray-500 dark:text-gray-400 font-semibold leading-none text-gray-900 mb-3"
                    >
                        Stock Information
                    </p>
                    <div>
                        {productStock && productStock.result && productStock.result.length > 0 ? (
                            productStock.result.map((stock, index) => (
                                <p key={index} className="text-base font-semibold leading-none text-gray-900 dark:text-white mb-1">
                                    {`[${stock.location_id[1]}]: ${stock.quantity} ${stock.product_uom_id[1]}`}
                                </p>
                            ))
                        ) : (
                            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">***Sin información de Stock***</p>
                        )}
                    </div>
                </div>
            }
        >
            <Button>Ver Stock</Button>
        </Popover>
    );
}

PopoverStock.propTypes = {
    dataToPopover: PropTypes.object.isRequired
};

