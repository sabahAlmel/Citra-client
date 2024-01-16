import React, { useState } from "react";
import style from "./CartCards.module.css";
import trashCan from "../../assets/icons/TrashCan.svg";
import redTrashCan from "../../assets/icons/redTrashCan.svg";

function CartCards({ name, price, color, size }) {
  const [hover, setHovered] = useState(false);
  const hoverHandler = () => {
    setHovered(!hover);
  };
  let trash = trashCan;
  if (hover) {
    trash = redTrashCan;
  } else {
    trash = trashCan;
  }
  return (
    <section className={style.wrapper}>
      <div className={style.pic}>
        <p>{name}</p>
      </div>
      <div className={style.middle}>
        <p>{price}</p>
        <p>{color}</p>
      </div>

      <p>{size}</p>
      <p>{size} $</p>

      <aside className={style.left}>
        <img
          src={trash}
          alt="trash can"
          onMouseOver={hoverHandler}
          onMouseOut={hoverHandler}
          className={style.trash}
        />
      </aside>
    </section>
  );
}

export default CartCards;
