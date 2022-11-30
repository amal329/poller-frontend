import React,{ useEffect, useState } from "react";
import slide1 from '../images/slide1.png';
import slide2 from '../images/slide2.png';
import slide3 from '../images/slide3.png';

export default function Carousel(){
    
    const images = [slide1,slide2,slide3]

    const [index,setIndex] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            increaseIndex();
        },3000);

        return () => clearInterval(interval);
    },[]);

    const changeIndex = (idx) => {
        setIndex(idx);
    }

    const increaseIndex = () => {
        setIndex(index => (index+1)%images.length);
    }

    return (
        <div className="carousel">
            {images.map((url,idx) => {
                if(idx === index){
                    return (
                        <div key={idx} className='image'>
                            <img src={url} alt="polls"/>
                        </div>
                    );
                }
            })}
            <div className="controls">
                {images.map((url,idx) => {
                    if(idx === index)
                        return <i onClick={() => changeIndex(idx)} key={idx} className="bi bi-circle-fill"></i>
                    else 
                        return <i onClick={() => changeIndex(idx)} key={idx} className="bi bi-circle"></i>
                })}
            </div>
        </div>
    );
}
