import React from 'react';
import { FaCartPlus, FaStar, FaTags } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from "../../Url/Url.js"

import axios from 'axios';
function ProductList() {

    const productList = useSelector(state => state.productList.products.products);
    const productStatus = useSelector(state => state.productList.status);
    const productRating = useSelector(state => state.productList.products.rating);
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

    const starProduct = (star) => {
        if (star == 0) {
            return (
                <>
                    <FaStar color='gray' />
                    <FaStar color='gray' />
                    <FaStar color='gray' />
                    <FaStar color='gray' />
                    <FaStar color='gray' />
                </>
            )
        }
        let html = [];
        for (let i = 0; i < star; i++) {
            html.push(<FaStar key={i} color='yellow' />)
        }
        return (html)
    }
    return (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 p-1 pt-3'>
            {productStatus != "loadding"
                ? (productList?.map((item, index) => (
                    <div key={index} className="card relative w-full ">
                        <div className='hover:cursor-pointer hover:scale-95 duration-150 '>
                            <Link to={`/product-detail`} state={{ ...item, rating: productRating[index][0], total: productRating[index][1] }}>
                                {item.discount != "0" ? <p className="font-medium flex items-center rounded px-3 py-1 bg-red-700 border-0 absolute top-0 right-0">
                                    <FaTags />
                                    <span>&nbsp; Giảm giá </span>
                                </p> : false}
                                <figure>
                                    <img
                                        className='lg:h-72 md:h-72 h-64'
                                        src={`${url}/product/img/${item.productId}/thumbnail.png`}
                                        alt="car!" />
                                </figure>
                            </Link>
                        </div>
                        <div className="card-body p-2">
                            <h2 className="ps-3 card-title">{item.productName}</h2>
                            {item.discount != 0 ? <p className='ps-3 opacity-60'>
                                <del>{item.price.toLocaleString('vi-VN', {
                                    
                                    currency: 'VND',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                })}</del>
                                <sup>&nbsp;vnđ</sup>
                            </p> : false}
                            <p className='ps-3 font-medium '>
                                {(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100).toLocaleString('vi-VN', {
                                    
                                    currency: 'VND',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                })}
                                <sup>&nbsp;vnđ</sup>
                                {item.discount != "0" ? <span className="badge badge-lg ms-2">-{item.discount}%</span> : false}
                            </p>
                            <p className='ps-3 italic'>Đã bán: {item.sold}</p>
                            <p className='ps-3 flex items-center gap-1'>
                                {starProduct(productRating[index][0])}
                                <span>({productRating[index][1]})</span>
                            </p>
                            <div className="card-actions justify-start">
                                <button
                                    onClick={() => handleAddToCartClick(item.productId)}
                                    className="btn btn-dark text-start">
                                    Thêm vào giỏ hàng
                                    <FaCartPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                )))
                : (<>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-72 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-72 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-72 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-72 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </>)
            }
        </div>
    );
}

export default ProductList;