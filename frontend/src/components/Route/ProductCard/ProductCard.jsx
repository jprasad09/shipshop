import React, { useState } from "react";
import {
    AiFillHeart,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
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
    };

    return (
        <>
            <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative">
                <div className="flex justify-end"></div>
                <img
                    src={`${data?.images && data?.images[0]?.url}`}
                    alt="Product"
                    className="w-full h-[170px] object-contain"
                />
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <span className={`${styles?.shop_name} cursor-pointer`}>{data?.shop?.name}</span>
                </Link>
                <Link className="cursor-pointer" to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data?._id}`}`}>
                    <h4 className="mb-3 h-[48px] font-[500]">
                        {data?.name?.length > 40 ? data?.name?.slice(0, 40) + "..." : data?.name}
                    </h4>

                    <div className="flex">
                        <Ratings rating={data?.ratings} />
                    </div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="flex">
                            <h5 className={`${styles.productDiscountPrice}`}>
                                ₹{data?.originalPrice === 0
                                    ? data?.originalPrice
                                    : data?.discountPrice}
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data?.originalPrice ? "₹" + data?.originalPrice : null}
                            </h4>
                        </div>
                        <span className="font-[400] text-[17px] text-[#68d284]">
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>

                {/* side options */}
                <div className="absolute right-2 top-2 flex flex-col gap-y-3 items-center">
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className="cursor-pointer"
                            onClick={() => removeFromWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className="cursor-pointer"
                            onClick={() => addToWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Add to wishlist"
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick view"
                    />
                    <AiOutlineShoppingCart
                        size={25}
                        className="cursor-pointer"
                        onClick={() => addToCartHandler(data._id)}
                        color="#444"
                        title="Add to cart"
                    />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </>
    );
};

export default ProductCard;