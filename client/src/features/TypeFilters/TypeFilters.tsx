import React, { useContext } from 'react';
import './styles/typeFilters.css'
import { CatalogContext } from '../../widgets/CatalogWidget/model/context/catalogContext';
import getAllProducts from '../../shared/api/getAllProducts';
import getByFilters from '../../shared/api/getByFilters';
import getProducts from '../../widgets/CatalogWidget/model/getProducts';

const TypeFilters = () => {
    const catalogData = useContext(CatalogContext);

    // getAllProducts().then((data: any) => console.log(data))
    // getByFilters('sortby=from-new&types=["bad", "mazi"]&prefered=[3, 14]').then(data => console.log(data))

    function changeFilters(event: any) {
        const value = event.target.value ? event.target.value : '';
        const newFilters = {
            ...catalogData?.filters,
            ["types"]: event.target.checked ? catalogData?.filters?.types.concat(value) : catalogData?.filters?.types.filter((item: string) => item !== value)
        };
        catalogData?.setFilters((prev: any) => {
            return({
                ...prev,
                ["types"]: event.target.checked ? prev?.types.concat(value) : prev?.types.filter((item: string) => item !== value)
            })
        });
        getProducts(newFilters).then((data: any) => catalogData?.setProducts(JSON.parse(data.products)))
    }

    console.log(catalogData?.filters.types.some(item => item === 'bad'));
    
    
    return (
        <div className='type-filter-block'>
            <label className='label'>
                <input onChange={changeFilters} type="checkbox" checked={catalogData?.filters.types.some(item => item === 'bad')} name='type' value='bad'  />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Бад</h2>
            </label>
            <label className='label'>
                <input onChange={changeFilters} type="checkbox" checked={catalogData?.filters.types.some(item => item === 'diet')} name='type' value='diet' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Дiетичнi добавки</h2>
            </label>
            <label className='label'>
                <input onChange={changeFilters} type="checkbox" checked={catalogData?.filters.types.some(item => item === 'mazi')} name='type' value='mazi' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Мазi</h2>
            </label>
            <label className='label'>
                <input onChange={changeFilters} type="checkbox" checked={catalogData?.filters.types.some(item => item === 'drugs')} name='type' value='drugs' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Пiгулки</h2>
            </label>
            <label className='label'>
                <input onChange={changeFilters} type="checkbox" checked={catalogData?.filters.types.some(item => item === 'vitamines')} name='type' value='vitamines' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Вiтамiни</h2>
            </label>
        </div>
    );
};

export default TypeFilters;