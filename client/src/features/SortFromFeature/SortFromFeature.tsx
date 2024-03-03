import React, { useContext, useState } from 'react';
import './styles/sortFromFeature.css';
import { CatalogContext } from '../../widgets/CatalogWidget/model/context/catalogContext';

const SortFromFeature = () => {
    const contextData = useContext(CatalogContext);

    const [sortBy, setSortBy] = useState<string[]>(['нiчого не обрано', 'спочатку дорогi', 'спочатку дешевi', 'спочатку новi', 'спочатку старi']);

    function chooseFilter(event: React.MouseEvent<HTMLButtonElement>) {
        const number = event.currentTarget.dataset.number ? +event.currentTarget.dataset.number : 0;
        const header = sortBy[0];
        const body = sortBy[number];

        setSortBy((prev: string[]) => {
            switch (number) {
                case 1:
                    return [prev[0] = body, prev[1] = header, prev[2], prev[3], prev[4]]
                case 2:
                    return [prev[0] = body, prev[1], prev[2] = header, prev[3], prev[4]]
                case 3:
                    return [prev[0] = body, prev[1], prev[2], prev[3] = header, prev[4]]
                case 4:
                    return [prev[0] = body, prev[1], prev[2], prev[3], prev[4] = header]
                default:
                    return [...prev]
            }
        })
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
                        <button className='body-btn' onClick={chooseFilter} data-number={1}>
                            {sortBy[1]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-number={2}>
                            {sortBy[2]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-number={3}>
                            {sortBy[3]}
                        </button>
                    </li>
                    <li className='body-item'>
                        <button className='body-btn' onClick={chooseFilter} data-number={4}>
                            {sortBy[4]}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SortFromFeature;