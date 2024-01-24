import React, { useState } from "react";
import style from "./CartCards.module.css";
import trashCan from "../../assets/icons/TrashCan.svg";
import redTrashCan from "../../assets/icons/redTrashCan.svg";
import { toast } from "react-toastify";

function Img() {
  const [hover, setHover] = useState(false);

  const hoverHandler = () => {
    setHover(!hover);
  };

  let trash = hover ? redTrashCan : trashCan;
  return (
    <img
      src={trash}
      alt="trashcan"
      onMouseOver={hoverHandler}
      onMouseOut={hoverHandler}
      style={{
        cursor: "pointer",
      }}
    />
  );
}

const CartCards = ({
  name,
  price,
  size,
  color,
  quantity,
  image,
  cartItems,
}) => {
  const [hover, setHovered] = useState(false);

  const hoverHandler = () => {
    setHovered(!hover);
  };

  const handleDelete = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingCart.findIndex(
      (item) =>
        item.name === name &&
        item.selectedColor === color &&
        item.selectedSize === size
    );

    if (itemIndex !== -1) {
      existingCart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(existingCart));
      cartItems(existingCart);
    }
    toast.success("Item deleted successfully!!");
  };

  return (
    <section className={style.wrapper}>
      <div className={style.picture}>
        <img src={`${process.env.REACT_APP_BACKEND}${image}`} alt={name} />
      </div>
      <div className={style.pic}>
        <p>{name}</p>
      </div>
      <div className={style.middle}>
        <p>{quantity}</p>
        <p>{color}</p>
      </div>

      <p>{size}</p>
      <p>{price} $</p>

      <aside className={style.left} onClick={handleDelete}>
        <Img />
      </aside>
    </section>
  );
};

export default CartCards;
