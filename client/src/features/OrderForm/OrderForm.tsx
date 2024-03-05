import React, { useState } from 'react';
import './styles/orderForm.css';
import { useForm } from 'react-hook-form';
import sendOrder from './api/sendOrder';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import Spinner from '../../shared/UI/Spinner/Spinner';
import ReCAPTCHA from "react-google-recaptcha";
import { FormFields } from './types/formProps';
import { clientHost } from '../../shared/constants/host';

const OrderForm = () => {
    const { 
        register,
        handleSubmit,
        formState: {
          errors
        },
        reset
    } = useForm<FormFields>();

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
                window.location.href = `${clientHost}`
            } else {
                setDisabled(true)
                alert('Напевно щось пышло не так(');
            }
        })
      }

      function onChange(value: any) {
        console.log("Captcha value:", value);
      }

    return (
        <form className='order-form' onSubmit={handleSubmit(submitData)}>
            <Spinner disabled={disabled} />
            <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m22!1m12!1m3!1d82345.00325540337!2d23.95343836730957!3d49.837170795155174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m7!3e6!4m0!4m4!2s49.837230%2C%2024.035886!3m2!1d49.83723!2d24.035885999999998!5e0!3m2!1suk!2sua!4v1709615554804!5m2!1suk!2sua" width="600" height="450" style={{border: "0"}} loading="lazy" ></iframe>
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
            
            <ReCAPTCHA
              sitekey="6LdDWoopAAAAADh6yx683y5XAIhLYG4osyg2s0QL"
              onChange={onChange}
            />

            <button className='submit' type='submit'>Зробити замовлення</button>
        </form>
    );
};

export default OrderForm;