import { createContext } from "react";

export const CatalogContext = createContext<{
    filters: {
        sortBy: '',
        types: [],
        prefered: []
    },
    products: [],
    initProduct: any,
    setFilters: any,
    setProducts: any, 
} | undefined>(undefined);