import React from "react";
import AddressForm from "../../components/AddressForm/AddressForm";
import OrderReview from "../../components/orderReview/OrderReview";
import style from "./Address.module.css";

function Address() {
  return (
    <>
      <section className={style.wrapper}>
        <AddressForm />
        <OrderReview />
      </section>
    </>
  );
}

export default Address;
