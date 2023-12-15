import React from 'react';
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { fetchCartDeleteThunkAction, fetchCartDownThunkAction, fetchCartUpThunkAction } from '../../Reduct-Slice/CartSlice';
import { Link } from 'react-router-dom';
import { url } from "../../Url/Url.js"

function CartProductList() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartList.cartList);
    let cartIsValue = (cart?.length != 0 && cart && typeof (cart) != "string");
    let totalAmount = 0;

    if (cartIsValue) {
        cart.forEach(element => {
            totalAmount += (element.product.price - (element.product.price * element.product.discount) / 100) * element.quantity;
        });
    }
    const getCustomerId = async () => {
        const customer = await localStorage.getItem("user");
        const customerId = await JSON.parse(customer).id;
        return customerId;
    }

    const handleCartDown = async (productId) => {
        const customerId = await getCustomerId()
        dispatch(fetchCartDownThunkAction({ productId, customerId }))
    }
    const handleCartUp = async (productId) => {
        const customerId = await getCustomerId()
        dispatch(fetchCartUpThunkAction({ productId, customerId }))
    }
    const hendleDeleteCart = async (productId) => {
        const customerId = await getCustomerId()
        dispatch(fetchCartDeleteThunkAction({ productId, customerId }))
    }
    return (
        <>
            {cartIsValue
                && cart?.map((item, index) => (
                    <div key={index} className='grid grid-cols-3 gap-2 py-2'>
                        <figure className='w-36 rounded overflow-hidden'>
                            <img
                                src={`${url}/product/img/${item.product.productId}/thumbnail.png`}
                                alt="loadding..."
                                className="h-full w-full object-cover object-center"
                            />
                        </figure>
                        <div className='col-span-2 ps-8 relative'>
                            <button
                                onClick={() => hendleDeleteCart(item.product.productId)}
                                className='text-3xl ms-6 text-red-600 hover:text-orange-700 absolute top-2 right-2'><TiDelete /></button>
                            <p className='text-lg font-medium' style={{ lineHeight: "50px" }}>
                                {item.product.productName}
                            </p>
                            <div className='flex gap-1 my-2'>
                                <button
                                    onClick={() => handleCartDown(item.product.productId)}
                                    className='btn btn-sm'>
                                    -
                                </button>
                                <p className='btn btn-sm'>{item.quantity}</p>
                                <button
                                    onClick={() => handleCartUp(item.product.productId)}
                                    className='btn btn-sm'>
                                    +
                                </button>
                            </div>
                            {item.product.discount != 0 && <p className='italic'>Giá: <del>{item.product.price.toLocaleString('vi-VN', {
                                
                                currency: 'VND',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            })}</del> <sup>vnđ</sup></p>}
                            {item.product.discount == 0 && <p className='italic'>Giá: {item.product.price.toLocaleString('vi-VN', {
                                
                                currency: 'VND',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            })} <sup>vnđ</sup></p>}
                            {item.product.discount != 0 && <p>Còn: {(item.product.price - (item.product.price * item.product.discount) / 100).toLocaleString('vi-VN', {
                                
                                currency: 'VND',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            })} <sup>vnđ</sup></p>}
                        </div>
                    </div>
                ))
            }
            {cartIsValue
                && <div className='flex justify-between items-end px-2 py-3'>
                    <p className='text-xl font-bold'>
                        <span className='italic'> Tổng tiền: </span>
                        <span className='text-lg'>{totalAmount.toLocaleString('vi-VN', {
                            
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        })} <sup>vnđ</sup></span>
                    </p>
                    <Link to={"/pay"} className='btn'>
                        <FaRegMoneyBill1 />
                        Đặt Mua
                    </Link>
                </div>
            }
        </>
    );
}

export default CartProductList;