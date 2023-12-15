import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa6";
import ani1 from "../Assets/ani1.gif";
import ani4 from "../Assets/ani4.gif";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartThunkAction } from '../Reduct-Slice/CartSlice';
import CartProductList from '../Components/Cart/ProductList';

function Cart() {
    const info = useLocation()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const loadding = useSelector(state => state.cartList.status);
    
    useEffect(() => {
        if (info.state?.id)
            dispatch(fetchCartThunkAction(info.state?.id));
        else {
            nav("/login")
        }
    }, [])

    return (
        info.state?.id && <>
            <p className='text-center text-2xl pb-6 font-bold'>Giỏ Hàng</p>
            <div className='w-fit grid lg:grid-cols-3 grid-cols-1 mx-auto'>
                <div className='text-center w-full'>
                    <img src={ani4} alt="" className='mx-auto' />
                    <p>Điện Thoại Việt Trì</p>
                    <p className='font-bold text-2xl'>Giao Hàng Hỏa Tốc</p>
                </div>
                <div className='grid grid-cols-1 px-2 py-6'>
                    {loadding == "idle"
                        ? <>
                            <CartProductList />
                            <Link to={"/"} className='btn'>Mua sắm tiếp<FaCartArrowDown /></Link>
                        </>
                        : "Loadding..."}
                </div>
                <div className=' text-center w-full'>
                    <img src={ani1} alt="" className='mx-auto' />
                    <p>Mua sắm thả ga với</p>
                    <p className='font-bold text-2xl'>Điện Thoại Việt Trì</p>
                </div>
            </div>
        </>
    );
}

export default Cart;