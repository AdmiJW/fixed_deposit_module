import React, { useContext, useLayoutEffect } from "react";
import { Carousel } from 'rsuite';

import { AppContext } from "../AppContext";

const IMAGES = [
    'https://img.freepik.com/free-photo/muslim-lady-use-smart-phone-credit-card-buy-purchase-e-commerce-internet-living-room-house_7861-2992.jpg?w=1380&t=st=1661227195~exp=1661227795~hmac=1c00ca7983155816b8c03405526c8b450682c040c7a8af0f126d52fb3bdeae03',
    'https://img.freepik.com/free-photo/woman-hand-holding-plant-growing-from-coins-bottle_1150-17715.jpg?w=1060&t=st=1661226890~exp=1661227490~hmac=af4a250d7093e81c042ec533d603ae8548a7d7e0ce4790b89f484bc421dd05e7',
    'https://img.freepik.com/free-photo/hand-putting-mix-coins-seed-clear-bottle-copyspace-business-investment-growth-concept_1423-103.jpg?w=1060&t=st=1661227115~exp=1661227715~hmac=16f39010f531e5c4ddc96e4ae11de2a86b5a0833b8e74fe4ba8a59ce99ad52ec',
    'https://img.freepik.com/free-photo/coin-wooden-table_1150-17728.jpg?w=1060&t=st=1661227082~exp=1661227682~hmac=0247f603b7cdba2bd0b87fdd5155284cf536bd4b31a4d1aa72fa1b0cc0f53855'
];


function Home(props) {
    const { setCrumb } = useContext(AppContext);

    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);
    

    return <>
        <Carousel autoplay className="custom-slider">
            {
                IMAGES.map((img, i) => <img key={i} src={img} alt="Fixed deposit" style={{ objectFit: 'cover'}}/>)
            }
        </Carousel>
    </>;
}

export default Home;