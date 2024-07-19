import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
    return (
        <div
            className={`relative py-16 w-full bg-cover ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://res.cloudinary.com/dpayixndd/image/upload/v1721153729/shipshop/petqdt5xwno01s4wrbrz.jpg)",
            }}
        >
            <div className="px-[60px]">
                <h1
                    className={`text-[35px] max-w-[600px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600]`}
                >
                    Discover Deals at Shipshop Today
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                    Discover top-quality products with ease and enjoy fast, reliable shipping. <br /> Shop smarter and experience convenience with every click. <br /> Your best deals and seamless shopping experience await at Shipshop.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;