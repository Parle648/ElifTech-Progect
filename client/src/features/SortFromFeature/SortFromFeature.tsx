import React, { useContext, useState } from 'react';
import './styles/sortFromFeature.css';
import { CatalogContext } from '../../widgets/CatalogWidget/model/context/catalogContext';
import getProducts from '../../widgets/CatalogWidget/model/getProducts';

const SortFromFeature = () => {
    const contextData = useContext(CatalogContext);

    const [sortBy, setSortBy] = useState<string[]>(['нiчого не обрано', 'спочатку дорогi', 'спочатку дешевi', 'спочатку новi', 'спочатку старi']);

    const catalogData = useContext(CatalogContext);

    function chooseFilter(event: React.MouseEvent<HTMLButtonElement>) {
        const number = event.currentTarget.dataset.number ? +event.currentTarget.dataset.number : 0;
        const header = sortBy[0];
        const body = sortBy[number];

        const newFilters = {
            ...catalogData?.filters,
            ["sortBy"]: event.currentTarget.innerText === 'нiчого не обрано' ? 'nothing' : event.currentTarget.dataset.name
        };
        catalogData?.setFilters((prev: any) => newFilters);

        getProducts(newFilters).then((data: any) => contextData?.setProducts(JSON.parse(data.products)))

        setSortBy((prev: string[]) => [...prev, prev[0] = body, prev[+number] = header])
    }

    function bodyToggle(event: React.MouseEvent<HTMLButtonElement>) {
        event.currentTarget.nextElementSibling?.classList.toggle('disabled')
    }

    

    return (
        <div className='sort-by-block'>
            <button className="header-block" onClick={bodyToggle}>
                {sortBy[0]}
            </button>
            <div className="body-block disabled">
                <ul className='body-list'>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-name='from-expensive' data-number={1}>
                            {sortBy[1]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-name='from-cheep' data-number={2}>
                            {sortBy[2]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-name='from-new' data-number={3}>
                            {sortBy[3]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-name='from-old' data-number={4}>
                            {sortBy[4]}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SortFromFeature;