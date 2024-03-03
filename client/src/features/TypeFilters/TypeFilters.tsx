import React from 'react';
import './styles/typeFilters.css'

const TypeFilters = () => {
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