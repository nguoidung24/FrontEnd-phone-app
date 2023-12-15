import React from 'react';

import SearchForm from '../Components/Home/SearchForm';
import Slide from '../Components/Home/Slide';
import Directory from '../Components/Home/Directory';
import ProductList from '../Components/Home/ProductsList';
import Tab from '../Components/Home/Tab';

function Home() {
    console.log("home-render");
    return (
        <div className='w-full lg:w-11/12 mx-auto'>
            <SearchForm />
            <Slide />
            <Directory />
            <Tab />
            <ProductList />           
        </div>
    );
}

export default Home;