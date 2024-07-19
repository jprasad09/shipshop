import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch]);

    const availableBalance = seller?.availableBalance.toFixed(2);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item?._id,
            itemsQty: item?.cart?.reduce((acc, item) => acc + item?.qty, 0),
            total: "₹" + item?.totalPrice?.toFixed(2),
            status: item?.status,
        });
    });
    return (
        <div className="w-full p-8">
            <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
            <div className="w-full block 1000px:flex items-start justify-between">
                <div className="w-full mb-4 1000px:w-[30%] min-h-fit bg-white shadow rounded px-2 py-5">
                    <div className="flex items-start">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            Balance (10% Tax)
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">₹{availableBalance}</h5>
                    <Link to="/dashboard-withdraw-money">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 1000px:w-[30%] min-h-fit bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Orders
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
                    <Link to="/dashboard-orders">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 1000px:w-[30%] min-h-fit bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Products
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
                    <Link to="/dashboard-products">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
                    </Link>
                </div>
            </div>
            <br />
            <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-fit bg-white rounded">
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div>
    );
};

export default DashboardHero;