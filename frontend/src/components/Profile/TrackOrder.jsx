import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            {" "}
            <>
                {data && data?.status === "Processing" ? (
                    <h1 className="text-[20px]">Your order is being processed in the shop.</h1>
                ) : data?.status === "With Courier" ? (
                    <h1 className="text-[20px]">
                        Your order is on the way to the delivery partner.
                    </h1>
                ) : data?.status === "In Transit" ? (
                    <h1 className="text-[20px]">
                        Your order is en route with our delivery partner.
                    </h1>
                ) : data?.status === "In City" ? (
                    <h1 className="text-[20px]">
                        Your order is in your city. Our delivery person will deliver it soon.
                    </h1>
                ) : data?.status === "Out for Delivery" ? (
                    <h1 className="text-[20px]">
                        Our delivery person is on their way to deliver your order.
                    </h1>
                ) : data?.status === "Delivered" ? (
                    <h1 className="text-[20px]">Your order is delivered.</h1>
                ) : data?.status === "Refund Pending" ? (
                    <h1 className="text-[20px]">Your refund is being processed.</h1>
                ) : data?.status === "Refund Completed" ? (
                    <h1 className="text-[20px]">Your refund has been successfully processed.</h1>
                ) : null}
            </>
        </div>
    );
};

export default TrackOrder;