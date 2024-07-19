import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
    };

    const addToCartHandler = (data) => {
        const newData = { ...data, qty: 1 };
        dispatch(addTocart(newData));
        setOpenWishlist(false);
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[70%] xl:w-[30%] overflow-y-scroll bg-white flex flex-col justify-between shadow-sm">
                <RxCross1
                    size={22}
                    className="absolute right-1 top-1 z-50 cursor-pointer"
                    onClick={() => setOpenWishlist(false)}
                />

                {wishlist && wishlist.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <h5>Wishlist is empty!</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            {/* Item length */}
                            <div className={`${styles.noramlFlex} p-4`}>
                                <AiOutlineHeart size={25} />
                                <h5 className="pl-2 text-[20px] font-[500]">
                                    {wishlist && wishlist.length} {wishlist?.length === 1 ? "item" : "items"}
                                </h5>
                            </div>

                            {/* cart Single Items */}
                            <div className="w-full border-t">
                                {wishlist &&
                                    wishlist.map((i, index) => (
                                        <WishlistSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;

    return (
        <div className="relative border-b p-4">
            <RxCross1 color="gray" size={14} className="cursor-pointer absolute top-1 right-1" title="Remove from wishlist"
                onClick={() => removeFromWishlistHandler(data)}
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
                        <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222]">
                            ₹{totalPrice}
                        </h4>
                    </div>
                </div>
                <div>
                    <BsCartPlus size={20} className="cursor-pointer" title="Add to cart"
                        onClick={() => addToCartHandler(data)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Wishlist;