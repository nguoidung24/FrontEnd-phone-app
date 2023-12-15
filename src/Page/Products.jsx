import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../Components/Home/ProductsList';
import { useDispatch } from 'react-redux';
import { fetchProductBrandThunkAction, fetchProductSearchThunkAction, fetchProductTypeThunkAction } from '../Reduct-Slice/HomeProductList';

const filterPrice = [
    "Tất cả",
    "Cao đến thấp",
    "Thấp đến cao"
]
const filterRange = [
    "Tất cả",
    "Dưới 3 triệu",
    "Từ 3 đến 7 triệu",
    "Từ 7 đến 15 triệu",
    "Trên 15 triệu"
]

function Products() {
    const query = useLocation();
    const dispatch = useDispatch();
    const [header, setHeader] = useState(null);
    const [filterPriceState, setFilterPriceState] = useState(0);
    const [filterSortState, setFilterSortState] = useState(0);

    const handleRadioPriceChange = (index) => {
        setFilterPriceState(index);
    };
    const handleRadioSortChange = (index) => {
        setFilterSortState(index)
    }
    const changeData = () =>{
        if (query.state.type == "type") {
            const data = {
                id: query.state.productTypeId,
                filterPriceState,
                filterSortState
            }
            dispatch(fetchProductTypeThunkAction(data))
            setHeader(query.state.productTypeName);

        }
        else if (query.state.type == "brand"){
            const data = {
                id: query.state.brandId,
                filterPriceState,
                filterSortState
            }
            dispatch(fetchProductBrandThunkAction(data))
            setHeader(query.state.brandName);
        }else{
            const data = {
                query: query.state.query,
                filterPriceState,
                filterSortState
            }
            dispatch(fetchProductSearchThunkAction(data))
            setHeader("Tìm kiếm");
        }
    }
    useEffect(() => {
        changeData();
    }, [])
    useEffect(() => {
        changeData();
    }, [filterPriceState])
    useEffect(() => {
        changeData();
    }, [filterSortState])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-6'>
            <div className='lg:col-span-full'>
                {header
                    ? <h2
                        className='text-center pb-5 text-xl font-medium'
                    >
                        {header}
                    </h2>
                    : ""
                }
            </div>
            <div className='grid lg:grid-cols-1 grid-cols-2 gap-y-2 h-fit text-sm'>
                <div className='grid grid-cols-1 gap-y-2 h-fit text-sm'>
                    <p className=' font-bold py-1'>Giá</p>
                    {
                        filterPrice.map((item, index) => (
                            <div key={index} className='flex gap-2'>
                                <input
                                    onChange={() => handleRadioSortChange(index)}
                                    checked={filterSortState === index}
                                    id={`radioSort_${index}`}
                                    type="radio"
                                    value={index}
                                    name="radioSort"
                                    className="radio radio-sm"
                                />
                                <label className='hover:cursor-pointer flex items-center hover:font-bold' htmlFor={`radioSort_${index}`}>{item}</label>
                            </div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-1 gap-y-2 h-fit text-sm'>
                    <p className=' font-bold py-1'>Từ</p>
                    {
                        filterRange.map((item, index) => (
                            <div key={index} className='flex gap-2'>
                                <input
                                    onChange={() => handleRadioPriceChange(index)}
                                    checked={filterPriceState === index}
                                    id={`radioRange_${index}`}
                                    type="radio"
                                    value={index}
                                    name="radioRange"
                                    className="radio radio-sm"
                                />
                                <label className='hover:cursor-pointer flex items-center hover:font-bold' htmlFor={`radioRange_${index}`}>{item}</label>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='lg:col-span-5 lg:border-s border-gray-600  min-h-[50vh]'>
                <ProductList />
            </div>
        </div>
    );
}

export default Products;