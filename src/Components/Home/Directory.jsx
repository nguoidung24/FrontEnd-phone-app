import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from "../../Url/Url.js"
import axios from 'axios';
function Directory() {
    const [productsType, setProductsType] = useState([]);
    const [productsBrand, setProductsBrand] = useState([]);
    const [loadding, setLoadding] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            let getProductsType = await axios.get(`${url}api/ProductTypes`);
            let getProductsBrand = await axios.get(`${url}api/Brands`);
            setProductsType(getProductsType.data);
            setProductsBrand(getProductsBrand.data);
            setLoadding(true)
        }
        fetchData();
    }, [])
    return (
        <div className='grid grid-cols-6 lg:grid-cols-11 py-1 text-center mt-3'>
            {loadding
                ? productsBrand.map((item, index) => (
                    <Link key={index} state={{ ...item, type: "brand" }} to={`products`} className='hover:cursor-pointer hover:scale-95  duration-150 '>
                        <img
                            className='w-12 p-1 h-12 mx-auto'
                            src={`${url}product/brand/${item.image}`}
                            alt="" />
                        <p className='text-sm py-1'> {item.brandName} </p>
                    </Link>
                ))
                : <>
                    <div className='w-full'>
                        <div className='w-2/4 h-14 mx-auto skeleton'></div>
                        <div className='w-2/4 h-2 mx-auto mt-2 skeleton'></div>
                    </div>
                    <div className='w-full'>
                        <div className='w-2/4 h-14 mx-auto skeleton'></div>
                        <div className='w-2/4 h-2 mx-auto mt-2 skeleton'></div>
                    </div>
                </>
            }
            {loadding
                ? productsType.map((item, index) => (

                    <Link
                        key={index}
                        state={{ ...item, type: "type" }}
                        to={`/products`}
                        className='hover:cursor-pointer hover:scale-95  duration-150 '>
                        <img className='w-10 h-12 p-1 mx-auto' src={`${url}product/type/${item.image}`} alt="" />
                        <p className='text-sm py-1'> {item.productTypeName} </p>
                    </Link>
                ))
                : <>
                    <div className='w-full'>
                        <div className='w-2/4 h-14 mx-auto skeleton'></div>
                        <div className='w-2/4 h-2 mx-auto mt-2 skeleton'></div>
                    </div>
                    <div className='w-full'>
                        <div className='w-2/4 h-14 mx-auto skeleton'></div>
                        <div className='w-2/4 h-2 mx-auto mt-2 skeleton'></div>
                    </div>
                </>
            }

        </div>
    );
}

export default Directory;