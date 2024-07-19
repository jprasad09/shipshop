import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
    return (
        <div
            className={`${styles.section} hidden lg:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
        >
            <div className="flex items-center justify-between w-full">
                <img
                    src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1692243006/heroku-new-logo"
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="Heroku"
                />
                <img
                    src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1688759801/integ-fastly"
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="Fastly"
                />
                <img
                    src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1688759802/integ-google_int_logo_2x"
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="Google"
                />
                <img
                    src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1688759801/integ-sap-logo"
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="SAP"
                />
                <img
                    src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1688759802/integ-salesforce_cc_logo_2x"
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="Salesforce"
                />
            </div>
        </div>
    );
};

export default Sponsored;