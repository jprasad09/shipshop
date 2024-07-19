import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
    const { allProducts } = useSelector((state) => state.products);
    const [productData, setProductData] = useState();

    const { id } = useParams();

    useEffect(() => {
        const filteredProducts = allProducts && allProducts?.filter((i) => i?.category === data?.category);
        setProductData(filteredProducts);
    }, []);

    return (
        <div>
            {data ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2
                        className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
                    >
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {
                            productData && productData?.filter(i => i?._id !== id)?.map((i) => (
                                <ProductCard data={i} key={i?._id} />
                            ))
                        }
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SuggestedProduct;