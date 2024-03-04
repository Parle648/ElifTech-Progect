import React, { useState } from 'react';
import './styles/orderForm.css';
import { useForm } from 'react-hook-form';
import sendOrder from './api/sendOrder';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import Spinner from '../../shared/UI/Spinner/Spinner';

const OrderForm = () => {
    const { 
        register,
        handleSubmit,
        formState: {
          errors
        },
        reset
    } = useForm<{name: string, email: string, phone_number: string, adress: string}>();

    const [order, setOrder] = useLocalStorage([], 'ordered')
    const [orderCost, setOrderCost] = useLocalStorage([], 'orderCost')

    const [disabled, setDisabled] = useState<boolean>(true)

      function submitData(data: any) {
        setDisabled(false)
        sendOrder({
            ...data,
            ["products"]: JSON.stringify(localStorage.ordered),
            ["total_price"]: JSON.parse(localStorage.orderCost)
        }).then((data) => {
            if (data.message) {
                setOrder([])
                setOrderCost(0)
                reset();
                setDisabled(true)
                alert('Ваше замовлення успiшно прийнято');
                window.location.href = 'http://localhost:3000/'
            } else {
                setDisabled(true)
                alert('Напевно щось пышло не так(');
            }
        })
      }

    return (
        <form className='order-form' onSubmit={handleSubmit(submitData)}>
            <Spinner disabled={disabled} />
            <input className='order-form-input' 
            {...register("name", {
                required: 'Enter your name',
                pattern: {
                    value: /^[а-яА-ЯёЁ]+$/,
                    message: 'введыть iмя виду Олександр'
                },
                minLength: {
                    value: 3,
                    message: 'повинно бути бiльше 3 символыв'
                }
            })}
            placeholder='введiть name' 
            type="text" 
            />
            {errors.name?.message && <h2 className='error-ttl'>{errors.name.message}</h2>}

            <input className='order-form-input' 
            placeholder='введiть email' 
            {...register('email', {
                required: 'Enter your email',
                pattern: {
                    value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                    message: 'введыть електронну пошту'
                },
            })}
            type="email" />
            {errors.email?.message && <h2 className='error-ttl'>{errors.email.message}</h2>}

            <input className='order-form-input' 
            placeholder='введiть phone_number' 
            {...register('phone_number', {
                required: 'Enter your phone number',
                pattern: {
                    value: /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/,
                    message: 'введыть Ваш номер телефону - +3809553261'
                },
            })}
            type="text" />
            {errors.phone_number?.message && <h2 className='error-ttl'>{errors.phone_number.message}</h2>}

            <input className='order-form-input' 
            placeholder='введiть adress' 
            {...register('adress', {
                required: 'Введiть Вашу адресу'
            })} 
            type="text" />
            {errors.adress?.message && <h2 className='error-ttl'>{errors.adress.message}</h2>}

            <button className='submit' type='submit'>Зробити замовлення</button>
        </form>
    );
};

export default OrderForm;