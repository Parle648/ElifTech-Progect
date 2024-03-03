import React, { useContext } from 'react';
import './styles/typeFilters.css'
import { CatalogContext } from '../../widgets/CatalogWidget/model/context/catalogContext';
import getAllProducts from '../../shared/api/getAllProducts';
import getByFilters from '../../shared/api/getByFilters';

const TypeFilters = () => {
    const catalogData = useContext(CatalogContext);

    // getAllProducts().then((data: any) => console.log(data))
    // getByFilters('sortby=from-new&types=["bad", "mazi"]&prefered=[3, 14]').then(data => console.log(data))
    
    return (
        <div className='type-filter-block'>
            <label className='label'>
                <input type="checkbox" name='type' value='bad'  />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Бад</h2>
            </label>
            <label className='label'>
                <input type="checkbox" name='type' value='diet' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Дiетичнi добавки</h2>
            </label>
            <label className='label'>
                <input type="checkbox" name='type' value='mazi' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Мазi</h2>
            </label>
            <label className='label'>
                <input type="checkbox" name='type' value='drugs' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Пiгулки</h2>
            </label>
            <label className='label'>
                <input type="checkbox" name='type' value='vitamines' />
                <div className="fake-checkbox"></div>
                <h2 className='checkbox-title'>Вiтамiни</h2>
            </label>
        </div>
    );
};

export default TypeFilters;