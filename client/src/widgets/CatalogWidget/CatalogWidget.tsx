import { useEffect } from 'react';
import { CatalogContext } from './model/context/catalogContext';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import SortFromFeature from '../../features/SortFromFeature/SortFromFeature';
import TypeFilters from '../../features/TypeFilters/TypeFilters';
import './styles/catalogWidget.css'
import getAllProducts from '../../shared/api/getAllProducts';
import ProductCart from '../../entities/ProductCart/ProductCart';

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
                            <ProductCart 
                                title={item.title}
                                description={item.description}
                                cost={item.cost}
                                img={item.photo}
                                closeComponent 
                                preferBtn
                                secondaryBlock
                            />
                        )
                    })}
                </div>
           </div>
        </CatalogContext.Provider>
    );
};

export default CatalogWidget;