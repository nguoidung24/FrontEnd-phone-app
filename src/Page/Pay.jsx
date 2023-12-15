import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCartThunkAction } from '../Reduct-Slice/CartSlice';
import CustomerInfo from '../Components/Pay/CustomerInfo';
import ProductInfo from '../Components/Pay/ProductInfo';


function Pay() {
    const user = localStorage.getItem("user");
    const dispatch = useDispatch();

    const nav = useNavigate();
    useEffect(() => {
        if (!user) {
            nav("/login");
        } else {
            const id = JSON.parse(user)?.id;
            dispatch(fetchCartThunkAction(id));
        }
    }, [])

    return (
        user && <div className='lg:px-28 md:px-32 px-8 pb-16 rounded-xl bg-white text-black w-fit mx-auto'>
            <p className='py-6 font-medium text-lg text-center uppercase'>Thông Tin Mua Hàng</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                <div className='w-full'>
                    <ProductInfo />
                </div>
                <div className='w-full'>
                    <CustomerInfo />
                </div>
            </div>
        </div>
    );
}

export default Pay;