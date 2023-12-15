import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import lgSlide from "../../Assets/bg_app.png";
import lgSlide2 from "../../Assets/lgSlide2.png";
import smSlide1 from "../../Assets/dd1.png";
import smSlide2 from "../../Assets/dd2.png";

function Slide() {
    const imgSlide = [lgSlide, lgSlide2];
    
    const handleClick = () => {
        console.log("click IMG slide");
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className=" overflow-hidden hover:cursor-pointer sm:h-fit lg:h-full rounded lg:col-span-2">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    onClickItem={handleClick}
                    showThumbs={false}
                    emulateTouch={true}
                >
                    {
                        imgSlide.map((item, index) => (
                            <div key={index}>
                                <img
                                    className="lg:h-[18.5rem] rounded"
                                    src={item}
                                    alt="Slide 1"
                                />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <div className="h-18 lg:h-36 overflow-hidden rounded">
                    <img
                        className="w-full h-full"
                        src={smSlide1}
                        alt=""
                    />
                </div>
                <div className="h-18 lg:h-36 overflow-hidden bg-white rounded">
                    <img
                        className="h-full"
                        src={smSlide2}
                        alt=""
                    />
                </div>
            </div>
        </div>

    );
}

export default Slide;