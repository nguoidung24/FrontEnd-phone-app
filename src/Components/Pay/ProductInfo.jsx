import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { url } from "../../Url/Url.js"

function ProductInfo() {
    const cart = useSelector(state => state.cartList.cartList);
    const nav = useNavigate()
    let cartIsValue = (cart?.length != 0 && cart && typeof (cart) != "string");
    let totalAmount = 0;

    if (cartIsValue) {
        cart.forEach(element => {
            totalAmount += (element.product.price - (element.product.price * element.product.discount) / 100) * element.quantity;
        });
    } else {
        nav("/")
    }

    return (
        <>
            <p className='text-center pb-2'>Thông tin sản phẩm</p>
            {
                cart.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 w-fit mx-auto gap-2 py-2'>
                        <figure className='w-36 rounded overflow-hidden'>
                            <img
                                src={`${url}/product/img/${item.product.productId}/thumbnail.png`}
                                alt="loadding..."
                                className="h-full w-full object-cover object-center"
                            />
                        </figure>
                        <div className=' ps-4 relative'>
                            <p className='text-lg font-medium' style={{ lineHeight: "50px" }}>
                                {item.product.productName}
                            </p>
                            <div className='flex gap-1 my-2'>
                                <p className='badge p-4'>Số lượng: {item.quantity}</p>
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
                && <div className='px-2 py-3 italic text-center lg:text-start'>
                    <p className='pt-4'>Tổng: {totalAmount.toLocaleString('vi-VN', {
                        
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    })} <sup>vnđ</sup></p>
                    <p className='py-1'>Phí vận chuyển: 30.000 <sup>vnđ</sup></p>
                    <p className='text-xl font-bold'>
                        <span className='italic'> Tổng tiền: </span>
                        <span className='text-lg'>{(totalAmount + 30000).toLocaleString('vi-VN', {
                            
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        })} <sup>vnđ</sup></span>
                    </p>
                </div>
            }
        </>
    );
}

export default ProductInfo;