import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <Header />
      <div className='my-10'>
        <CheckoutSteps active={2} />
        <Payment />
      </div>
      <Footer />
    </div>
  )
}

export default PaymentPage;