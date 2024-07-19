import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    };

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    );

    const quantityChangeHandler = (data) => {
        dispatch(addTocart(data));
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[70%] xl:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
                <RxCross1
                    size={22}
                    className="absolute right-1 top-1 z-50 cursor-pointer"
                    onClick={() => setOpenCart(false)}
                />

                {cart && cart.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <h5>Cart is empty!</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            {/* Item length */}
                            <div className={`${styles.noramlFlex} p-4`}>
                                <IoBagHandleOutline size={25} />
                                <h5 className="pl-2 text-[20px] font-[500]">
                                    {cart && cart.length} {cart?.length === 1 ? "item" : "items"}
                                </h5>
                            </div>

                            {/* cart Single Items */}
                            <div className="w-full border-t">
                                {cart &&
                                    cart.map((i, index) => (
                                        <CartSingle
                                            key={index}
                                            data={i}
                                            quantityChangeHandler={quantityChangeHandler}
                                            removeFromCartHandler={removeFromCartHandler}
                                        />
                                    ))}
                            </div>
                        </div>

                        <div className="px-5 mb-3">
                            {/* checkout buttons */}
                            <Link to="/checkout">
                                <div
                                    className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                                >
                                    <h1 className="text-[#fff] text-[18px] font-[600]">
                                        Checkout Now (₹{totalPrice})
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discountPrice * value;

    const increment = (data) => {
        if (data.stock < value) {
            toast.error("Product stock is limited");
        } else {
            setValue(value + 1);
            const updateCartData = { ...data, qty: value + 1 };
            quantityChangeHandler(updateCartData);
        }
    };

    const decrement = (data) => {
        setValue(value === 1 ? 1 : value - 1);
        const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
        quantityChangeHandler(updateCartData);
    };

    return (
        <div className="relative border-b p-4">
            <RxCross1
                color="gray" size={14} className="cursor-pointer absolute top-1 right-1" title="Remove from cart"
                onClick={() => removeFromCartHandler(data)}
            />

            <div className="w-full flex items-center gap-x-2 justify-between">
                <div className="flex items-center gap-x-2">
                    <img
                        src={`${data?.images[0]?.url}`}
                        alt="Product"
                        className="w-[130px] h-min rounded-[5px]"
                    />
                    <div className="max-w-[300px]">
                        <h1>{data?.name}</h1>
                        <h4 className="font-[400] text-[15px] text-[#00000082]">
                            ₹{data?.discountPrice} * {value}
                        </h4>
                        <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
                            ₹{totalPrice}
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-1">
                    <div
                        className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[20px] h-[20px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => increment(data)}
                    >
                        <HiPlus size={16} color="#fff" />
                    </div>
                    <span>{data?.qty}</span>
                    <div
                        className={`bg-[#a7abb14f] rounded-full w-[20px] h-[20px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => decrement(data)}
                    >
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;