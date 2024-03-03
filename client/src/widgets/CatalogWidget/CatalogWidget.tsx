import React, { useState } from 'react';
import { CatalogContext } from './model/context/catalogContext';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import SortFromFeature from '../../features/SortFromFeature/SortFromFeature';
import TypeFilters from '../../features/TypeFilters/TypeFilters';

const CatalogWidget = () => {
    const [products, setProducts] = useState<[]>([]);

    const [filters, setFilters] = useLocalStorage({
        sortBy: "nothing",
        types: [],
        prefered: []
    }, 'drugs-filters');

    function initProducts(event: any) {
        console.log(event.target);
    }

    return (
        <CatalogContext.Provider value={{
            filters: filters,
            setFilters: setFilters,
            products: products,
            setProducts: setProducts, 
            initProduct: initProducts,
        }}>
            <SortFromFeature />
            <TypeFilters />
            {products.map((item: any) => {
                return (
                    <div key={item.id} className="">
                        <h2>{item.title}</h2>
                        <h2>{item.cost}</h2>
                    </div>
                )
            })}
        </CatalogContext.Provider>
    );
};

export default CatalogWidget;