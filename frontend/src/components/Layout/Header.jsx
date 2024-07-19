import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { isSeller } = useSelector((state) => state.seller);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const { allProducts } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredProducts =
            allProducts && term &&
            allProducts.filter((product) =>
                product?.name?.toLowerCase()?.includes(term?.toLowerCase())
            );
        setSearchData(filteredProducts);
    };

    return (
        <>
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:py-[40px] 800px:flex items-center justify-between">
                    <div>
                        <Link className="flex items-center justify-center gap-x-2" to="/">
                            <img className="h-[40px]" src="/android-chrome-192x192.png" alt="Logo" />
                            <h1 className="font-semibold text-3xl">Shipshop</h1>
                        </Link>
                    </div>
                    {/* search box */}
                    <div className="w-[50%] relative">
                        <input
                            type="search"
                            placeholder="Search Product"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                        />
                        {!searchData && searchData?.length === 0 && (
                            <AiOutlineSearch
                                size={22}
                                className="absolute right-2 top-2"
                            />
                        )}
                        {searchData && searchData.length !== 0 ? (
                            <div className="absolute bg-slate-50 shadow-xl z-50 px-2 py-4 w-full rounded-b-sm flex flex-col gap-y-3">
                                {searchData &&
                                    searchData.map((i) => (
                                        <Link key={i?._id} to={`/product/${i?._id}`}>
                                            <div className="w-full flex items-center">
                                                <img
                                                    src={`${i?.images[0]?.url}`}
                                                    alt="Product"
                                                    className="w-[40px] h-[40px] mr-[10px]"
                                                />
                                                <h1>{i?.name}</h1>
                                            </div>
                                        </Link>
                                    )
                                    )}
                            </div>
                        ) : null}
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                            <h1 className="text-[#fff] flex items-center">
                                {isSeller ? "Dashboard" : "Become Seller"}{" "}
                                <IoIosArrowForward className="ml-1" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className="sticky -top-[1px] left-0 z-10 shadow-sm transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]"
            >
                <div
                    className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
                >
                    {/* categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-[13.5px] left-2" />
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white text-lg font-[500] select-none rounded-t-md`}
                            >
                                All Categories
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-5 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            {dropDown ? (
                                <DropDown
                                    categoriesData={categoriesData}
                                    setDropDown={setDropDown}
                                />
                            ) : null}
                        </div>
                    </div>
                    {/* navitems */}
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>

                    <div className="flex">
                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => setOpenWishlist(true)}
                            >
                                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center pt-[1px]">
                                    {wishlist && wishlist.length}
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => setOpenCart(true)}
                            >
                                <AiOutlineShoppingCart
                                    size={30}
                                    color="rgb(255 255 255 / 83%)"
                                />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center pt-[1px]">
                                    {cart && cart.length}
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                {isAuthenticated ? (
                                    <Link to="/profile">
                                        <img
                                            src={`${user?.avatar?.url}`}
                                            className="w-[35px] h-[35px] rounded-full"
                                            alt=""
                                        />
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* cart popup */}
                        {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                        {/* wishlist popup */}
                        {openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist} />
                        ) : null}
                    </div>
                </div>
            </div>

            {/* mobile header */}
            <div className="w-full py-5 bg-[#fff] shadow-sm 800px:hidden">
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft
                            size={40}
                            className="ml-4"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <div>
                        <Link className="flex items-center justify-center gap-x-2" to="/">
                            <img className="h-[40px]" src="/android-chrome-192x192.png" alt="Logo" />
                            <h1 className="font-semibold text-3xl">Shipshop</h1>
                        </Link>
                    </div>
                    <div className="flex gap-x-2">
                        <div
                            className="relative"
                            onClick={() => setOpenWishlist(true)}
                        >
                            <AiOutlineHeart size={30} />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center">
                                {wishlist && wishlist.length}
                            </span>
                        </div>
                        <div
                            className="relative mr-[20px]"
                            onClick={() => setOpenCart(true)}
                        >
                            <AiOutlineShoppingCart size={30} />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center">
                                {cart && cart.length}
                            </span>
                        </div>
                    </div>
                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    {/* wishlist popup */}
                    {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
                </div>

                {/* header sidebar */}
                {open && (
                    <div
                        className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
                    >
                        <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                            <div className="absolute top-1 right-1">
                                <RxCross1
                                    size={22}
                                    onClick={() => setOpen(false)}
                                />
                            </div>

                            <div className="my-8 pt-5 w-[92%] m-auto h-[40px relative]">
                                <input
                                    type="search"
                                    placeholder="Search Product"
                                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchData && (
                                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 px-2 py-4 rounded-b-sm flex flex-col gap-y-3">
                                        {searchData.map((i) => {
                                            const d = i?.name;

                                            const product_name = d.replace(/\s+/g, "-");
                                            return (
                                                <Link key={i?._id} to={`/product/${product_name}`}>
                                                    <div className="flex items-center">
                                                        <img
                                                            src={`${i?.images[0]?.url}`}
                                                            alt="Product"
                                                            className="w-[50px] mr-2"
                                                        />
                                                        <h5>{i?.name}</h5>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <Navbar active={activeHeading} />
                            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                <Link to="/shop-create">
                                    <h1 className="text-[#fff] flex items-center">
                                        Become Seller <IoIosArrowForward className="ml-1" />
                                    </h1>
                                </Link>
                            </div>
                            <div className="flex w-full justify-center mt-10">
                                {isAuthenticated ? (
                                    <div>
                                        <Link to="/profile">
                                            <img
                                                src={`${user.avatar?.url}`}
                                                alt=""
                                                className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                                            />
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="text-[18px] text-[#000000b7]"
                                        >
                                            Login
                                        </Link>
                                        <span className="text-[18px] px-5 text-[#000000b7]">Or</span>
                                        <Link
                                            to="/sign-up"
                                            className="text-[18px] text-[#000000b7]"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;