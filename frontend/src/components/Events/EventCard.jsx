import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    let location = useLocation();

    const addToCartHandler = (data) => {
        const isItemExists = cart && cart.find((i) => i?._id === data?._id);
        if (isItemExists) {
            toast.error("The item is already in the cart");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock is limited");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to the cart successfully");
            }
        }
    }
    return (
        <div className={`w-full ${location?.pathname === "/events" ? "min-h-[95vh]" : "h-auto"} bg-white rounded-lg ${active ? "unset" : "mb-12"} flex flex-col lg:flex-row items-center justify-center gap-y-1 gap-x-8 p-4`}>
            {!data ? (
                <span>No Events found!</span>
            ) : (
                <>
                <div>
                    <img src={`${data?.images[0]?.url}`} className="max-h-[500px]" alt="Event" />
                </div>
                <div className="max-w-[600px] flex flex-col">
                    <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
                    <p className="max-w-[500px] mt-5 mb-2">{data?.description}</p>
                    <div className="flex py-2 justify-between mb-5">
                        <div className="flex">
                            <h5 className="font-bold text-[20px] pr-5 text-[#333]">
                                ₹{data?.discountPrice}
                            </h5>
                            <h5 className="font-[500] text-[18px] text-[#d55b45] line-through">
                                ₹{data?.originalPrice}
                            </h5>
                        </div>
                        <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                            {data?.sold_out} sold
                        </span>
                    </div>
                    <CountDown data={data} />
                    <div className="flex items-center mt-5">
                        <Link to={`/product/${data?._id}?isEvent=true`}>
                            <div className={`${styles.button} text-[#fff]`}>See Details</div>
                        </Link>
                        <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to Cart</div>
                    </div>
                </div>
            </>

            )}
        </div >
    );
};

export default EventCard;