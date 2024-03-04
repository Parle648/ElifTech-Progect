import React from 'react';
import './styles/addToOrder.css'
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';

const AddToOrderBtn = ({id}: {id: number}) => {
    const [ordered, setOrdered] = useLocalStorage([], 'ordered');

    let added = ordered.some((product: any) => product.id === id)

    function addToOrdered(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.currentTarget.classList.contains('added')) {
            const arr = localStorage.ordered ? JSON.parse(localStorage.ordered) : []
            arr.push({"id": id, "count": 1})
            event?.currentTarget.classList.add('added')
            setOrdered(arr);
        }
    }

    return (
        <button className={`order-btn ${added && 'added'}`} onClick={addToOrdered}>
            Додати в кошик
        </button>
    );
};

export default AddToOrderBtn;