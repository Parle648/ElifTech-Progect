import React from 'react';
import './styles/orderForm.css';
import { useForm } from 'react-hook-form';

const OrderForm = () => {
    const { 
        register,
        handleSubmit,
        formState: {
          errors
        }
      } = useForm<{name: string, email: string, phone_number: string, adress: string}>();
    
      function submitData(data: any) {
        console.log(data);
      }

    return (
        <form className='order-form' onSubmit={handleSubmit(submitData)}>
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

            <button type='submit'></button>
        </form>
    );
};

export default OrderForm;