import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductDiscountThunkAction, fetchProductHotThunkAction, fetchProductThunkAction } from '../../Reduct-Slice/HomeProductList';

const tabs = [
    "Bán chạy",
    "Tất cả",
    "Giảm giá"
];

function Tab() {
    const [tabActive, setTabActive] = useState(1);

    const dispatch = useDispatch();
    useEffect(() => {
        if(tabActive == 1){
            dispatch(fetchProductThunkAction())
        }
        else if(tabActive == 0){
            dispatch(fetchProductHotThunkAction())
        }else if(tabActive == 2){
            dispatch(fetchProductDiscountThunkAction())
        }
    }, [tabActive]);
    
    const handleClick = (value) =>{
        setTabActive(value)
    }
    return (
        <div role="tablist" className="tabs tabs-lifted pb-3 mt-3">
            <a role="tab" className="tab"></a>
            {tabs.map((item, index) => (
                <a 
                    onClick={() => handleClick(index)}
                    role="tab" 
                    key={index} 
                    className={`tab ${tabActive == index ? " tab-active" : ""}`}
                >
                    <p className='lg:px-5 lg:text-base text-[13px]'>{item}</p>
                </a>
            ))}
            <a role="tab" className="tab"></a>
        </div>
    );
}

export default Tab;