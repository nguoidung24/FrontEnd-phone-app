import React from 'react';
import notFound from '../Assets/gifNotFound.gif';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='absolute top-0 left-0 w-screen h-screen'>
            <div className='absolute text-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <img src={notFound} alt="" />
                <p className='text-lg py-2 font-medium'>Trang này hiện không có</p>
                <Link className='btn' to={"/"}>Trang chủ</Link>
            </div>
        </div>
    );
}

export default NotFound;