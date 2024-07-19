import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({ active }) => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className="flex items-center">
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${styles.cart_button} px-[10px] sm:px-[20px]`}>
                        <span className={`${styles.cart_button_text}`}>1. Shipping</span>
                    </div>
                    <div className={`${active > 1 ? "w-[10px] sm:w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                            : "w-[10px] sm:w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 1 ? `${styles.cart_button} px-[10px] sm:px-[20px]` : `${styles.cart_button} px-[10px] sm:px-[20px] !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            2. Payment
                        </span>
                    </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 3 ? "w-[10px] sm:w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                            : "w-[10px] sm:w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                    <div className={`${active > 2 ? `${styles.cart_button} px-[10px] sm:px-[20px]` : `${styles.cart_button} px-[10px] sm:px-[20px] !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            3. Success
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSteps;