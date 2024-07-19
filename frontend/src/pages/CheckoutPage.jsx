import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <div className='my-10'>
        <CheckoutSteps active={1} />
        <Checkout />
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage;