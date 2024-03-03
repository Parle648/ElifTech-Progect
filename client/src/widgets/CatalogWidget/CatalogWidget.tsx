import React, { useEffect, useState } from 'react';
import { CatalogContext } from './model/context/catalogContext';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import SortFromFeature from '../../features/SortFromFeature/SortFromFeature';
import TypeFilters from '../../features/TypeFilters/TypeFilters';
import './styles/catalogWidget.css'
import getAllProducts from '../../shared/api/getAllProducts';

const CatalogWidget = () => {
    const [products, setProducts] = useLocalStorage([], 'products');

    useEffect(() => {
        if (products.length === 0) {
            getAllProducts().then((data: any) => setProducts(JSON.parse(data.products)))
        }
    }, [])

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
           <div className='catalog-main'>
                <div>
                    <SortFromFeature />
                    <TypeFilters />
                </div>
                <div className='products-block'>
                    {products.map((item: any) => {
                        return (
                            <div key={item.id} className="">
                                <h2>{item.title}</h2>
                                <h2>{item.cost}</h2>
                            </div>
                        )
                    })}
                </div>
           </div>
        </CatalogContext.Provider>
    );
};

export default CatalogWidget;