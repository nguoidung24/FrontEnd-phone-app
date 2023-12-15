import React from 'react';
import { FaStar, FaTag, FaCartPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { url } from "../Url/Url.js"
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductDetail() {
    const query = useLocation()
    const infoProduct = query.state;
    const nav = useNavigate();
    const handleAddToCartClick = (id) => {
        const user = localStorage.getItem('user');
        if (!user)
            nav("/login")
        else {
            axios.post(`${url}api/Carts`,
                {
                    "customerId": JSON.parse(user).id,
                    "productId": id,
                    "quantity": 1
                });
            toast.success("Đã thêm vào giỏ hàng 🛒");
        }
    }
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
            <div>

                <div className='relative'>
                    {infoProduct.discount != "0" ? <p className="font-medium flex items-center rounded px-3 py-1 bg-red-700 border-0 absolute top-0 left-0">
                        <FaTag />
                        <span>&nbsp; Giảm giá </span>
                    </p> : false}
                    <figure>
                        <img
                            className='w-2/4 mx-auto'
                            src={`${url}/product/img/${infoProduct.productId}/thumbnail.png`}

                            alt="" />
                    </figure>
                </div>
                <div className='grid grid-cols-4 gap-2 py-2'>
                    <figure>
                        <img
                            className='mx-auto'
                            src={`${url}/product/img/${infoProduct.productId}/detail/1.png`}
                            alt="" />
                    </figure>
                    <figure>
                        <img
                            className='mx-auto'
                            src={`${url}/product/img/${infoProduct.productId}/detail/2.png`}
                            alt="" />
                    </figure>
                    <figure>
                        <img
                            className='mx-auto'
                            src={`${url}/product/img/${infoProduct.productId}/detail/3.png`}
                            alt="" />
                    </figure>
                    <figure>
                        <img
                            className='mx-auto'
                            src={`${url}/product/img/${infoProduct.productId}/detail/4.png`}
                            alt="" />
                    </figure>
                </div>
            </div>
            <div>
                <h3 className='text-2xl text-center my-2 lg:text-start font-medium'>
                    {infoProduct.productName}
                </h3>
                <div className='ps-6'>
                    <p>Đãn bán: {infoProduct.sold} chiếc</p>
                    <p className='flex items-center gap-1'>
                        {infoProduct.rating}
                        <FaStar />
                        ({infoProduct.total} lượt đánh giá)
                    </p>
                    <p>Mô tả: {infoProduct.description}</p>
                    {infoProduct.discount != "0"
                        ? <p>Giá bán:&nbsp; <del>{infoProduct.price.toLocaleString('vi-VN', {
                            
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        })}</del> <sup>vnđ</sup></p>
                        : <p>Giá bán:&nbsp; {infoProduct.price.toLocaleString('vi-VN', {
                            
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        })} <sup>vnđ</sup></p>
                    }
                    {infoProduct.discount != "0"
                        ? <p>Giảm: &nbsp;
                            <span className='badge badge-lg'>{`${infoProduct.discount}%`}</span>
                        </p>
                        : false
                    }
                    {infoProduct.discount != "0"
                        ? <p>Chỉ còn:&nbsp;
                            {(Number(infoProduct.price) - (Number(infoProduct.price) * Number(infoProduct.discount)) / 100).toLocaleString('vi-VN', {
                                
                                currency: 'VND',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            })}
                            <sup>&nbsp;vnđ</sup>
                        </p>
                        : false
                    }
                    <button
                        onClick={() => handleAddToCartClick(infoProduct.productId)}
                        className="btn mt-3 btn-dark text-start">
                        Thêm vào giỏ hàng
                        <FaCartPlus />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
