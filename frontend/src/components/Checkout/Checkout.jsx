import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [userInfo, setUserInfo] = useState(false);
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const paymentSubmit = () => {
        if (address === "" || zipCode === null || country === "" || state === "") {
            toast.error("Please fill all the required fields")
        } else {
            const shippingAddress = {
                address,
                zipCode,
                country,
                state,
            };

            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user,
            }

            // update local storage with the updated orders array
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/payment");
        }
    };

    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    );

    // this is shipping cost variable
    const shipping = subTotalPrice * 0.1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = couponCode;

        await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
            const shopId = res.data.couponCode?.shopId;
            const couponCodeValue = res.data.couponCode?.value;
            if (res.data.couponCode !== null) {
                const isCouponValid =
                    cart && cart.filter((item) => item.shopId === shopId);

                if (isCouponValid.length === 0) {
                    toast.error("Invalid coupon code");
                    setCouponCode("");
                } else {
                    const eligiblePrice = isCouponValid.reduce(
                        (acc, item) => acc + item.qty * item.discountPrice,
                        0
                    );
                    const discountPrice = (eligiblePrice * couponCodeValue) / 100;
                    setDiscountPrice(discountPrice);
                    setCouponCodeData(res.data.couponCode);
                    setCouponCode("");
                }
            }
            if (res.data.couponCode === null) {
                toast.error("Invalid coupon code");
                setCouponCode("");
            }
        });
    };

    const discountPercentenge = couponCodeData ? discountPrice : "";

    const totalPrice = couponCodeData
        ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
        : (subTotalPrice + shipping).toFixed(2);

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo
                        user={user}
                        country={country}
                        setCountry={setCountry}
                        state={state}
                        setState={setState}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        address={address}
                        setAddress={setAddress}
                        zipCode={zipCode}
                        setZipCode={setZipCode}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        handleSubmit={handleSubmit}
                        totalPrice={totalPrice}
                        shipping={shipping}
                        subTotalPrice={subTotalPrice}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        discountPercentenge={discountPercentenge}
                    />
                </div>
            </div>
            <div
                className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className="text-white">Go to Payment</h5>
            </div>
        </div>
    );
};

const ShippingInfo = ({
    user,
    country,
    setCountry,
    state,
    setState,
    userInfo,
    setUserInfo,
    address,
    setAddress,
    zipCode,
    setZipCode,
}) => {
    return (
        <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500] mb-5">Shipping Address</h5>
            <form>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Full Name</label>
                        <input
                            type="text"
                            value={user && user.name}
                            required
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Email Address</label>
                        <input
                            type="email"
                            value={user && user.email}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Phone Number</label>
                        <input
                            type="number"
                            required
                            value={user && user.phoneNumber}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Zip Code</label>
                        <input
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Country</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your country
                            </option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">State</label>
                        <select
                            className="w-full border h-[40px] rounded-[5px]"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your state
                            </option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-full">
                        <label className="block pb-2">Address</label>
                        <input
                            type="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div></div>
            </form>
            {!userInfo && user && user.addresses.length > 0 && (
                <h5
                    className="text-[18px] inline-block mt-5"
                    // onClick={() => setUserInfo(!userInfo)}
                >
                    Choose from saved addresses
                </h5>
            )}
            {!userInfo && user?.addresses?.map((item) => (
                <div className="w-full flex mt-1">
                    <input
                        type="radio"
                        name="address"
                        id="address"
                        className="mr-3 cursor-pointer"
                        value={item.addressType}
                        onClick={() =>
                            setAddress(item?.address) ||
                            setZipCode(item?.zipCode) ||
                            setCountry(item?.country) ||
                            setState(item?.state)
                        }
                    />
                    <label htmlFor="address" className="cursor-pointer">{item.addressType}</label>
                </div>
            ))}
        </div>
    );
};

const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    couponCode,
    setCouponCode,
    discountPercentenge,
}) => {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
                <h5 className="text-[18px] font-[600]">₹{subTotalPrice.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
                <h5 className="text-[18px] font-[600]">₹{shipping.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">
                    - {discountPercentenge ? "₹" + discountPercentenge?.toFixed(2).toString() : null}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">₹{totalPrice}</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder="Coupoun code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                />
                <input
                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Apply code"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default Checkout;