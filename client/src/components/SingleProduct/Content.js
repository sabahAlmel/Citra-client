import React, { useState } from "react";
import style from "./Content.module.css";

function Content() {
  let products = [
    {
      _id: "65a7e7189a6ecc7a796e28dc",
      name: "product 10",
      price: 50,
      serialNumber: "2",
      images: ["image-1705502488858.jpg", "image-1705502488859.jpeg"],
      details: [
        {
          color: "red",
          sizes: [
            {
              size: "small",
              quantity: 9,
              _id: "65a7e7189a6ecc7a796e28de",
            },
            {
              size: "medium",
              quantity: 20,
              _id: "65a7e7189a6ecc7a796e28df",
            },
          ],
          _id: "65a7e7189a6ecc7a796e28dd",
        },
        {
          color: "blue",
          sizes: [
            {
              size: "small",
              quantity: 9,
              _id: "65a7e7189a6ecc7a796e28e1",
            },
          ],
          _id: "65a7e7189a6ecc7a796e28e0",
        },
        {
          color: "brown",
          sizes: [
            {
              size: "large",
              quantity: 10,
              _id: "65a7e7189a6ecc7a796e28e3",
            },
            {
              size: "medium",
              quantity: 20,
              _id: "65a7e7189a6ecc7a796e28e4",
            },
          ],
          _id: "65a7e7189a6ecc7a796e28e2",
        },
      ],
      subCategoryID: "65a1802af2a3f8191855d4eb",
      categoryID: "65a17e21f2a3f8191855d4e6",
      type: "suede",
      createdAt: "2024-01-17T14:41:28.874Z",
      updatedAt: "2024-01-17T14:41:28.874Z",
      slug: "product-10",
      __v: 0,
    },
  ];

  const [selectedColor, setSelectedColor] = useState(
    products[0].details[0].color
  );
  const [selectedSize, setSelectedSize] = useState(
    products[0].details[0].sizes[0].size
  );
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color) => {
    setSelectedColor(color);

    const firstInstance = products[0].details.find(
      (detail) => detail.color === color
    );
    if (firstInstance) {
      setSelectedSize(firstInstance.sizes[0].size);

      if (quantity > firstInstance.sizes[0].quantity) {
        setQuantity(1);
      }
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);

    const selectedColorDetails = products[0].details.find(
      (detail) => detail.color === selectedColor
    );
    const selectedSizeDetails = selectedColorDetails.sizes.find(
      (s) => s.size === size
    );
    if (quantity > selectedSizeDetails.quantity) {
      setQuantity(1);
    }
  };

  const handleIncrement = () => {
    const availableQuantity = getAvailableQuantity(selectedColor, selectedSize);

    if (quantity < availableQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const getAvailableQuantity = (color, size) => {
    const selectedColorDetails = products[0].details.find(
      (detail) => detail.color === color
    );
    const selectedSizeDetails = selectedColorDetails.sizes.find(
      (s) => s.size === size
    );

    return selectedSizeDetails ? selectedSizeDetails.quantity : 0;
  };

  return (
    <div className={style.content}>
      <div className={style.title}>{products[0].name}</div>
      <div className={style.price}>${products[0].price}</div>
      <div className={style.color}>
        <h4>اختاري اللون</h4>
        <div className={style.colorPalette}>
          {products[0].details.map((detail, index) => (
            <div
              key={index}
              onClick={() => handleColorChange(detail.color)}
              style={{
                backgroundColor: detail.color,
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                cursor: "pointer",
                opacity: detail.color === selectedColor ? 0.7 : 1,
                border:
                  detail.color === selectedColor ? "2px solid #4d342b" : "none",
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className={style.size}>
        <h4>اختاري القياس</h4>
        <div className={style.sizes}>
          {products[0].details
            .filter((detail) => detail.color === selectedColor)
            .map((detail) =>
              detail.sizes.map((size, index) => (
                <div className={style.radio} key={index}>
                  <input
                    type="radio"
                    name="size"
                    value={size.size}
                    id={index}
                    checked={size.size === selectedSize}
                    onChange={() => handleSizeChange(size.size)}
                  />
                  <label htmlFor={index}>{size.size}</label>
                </div>
              ))
            )}
        </div>
      </div>
      <div className={style.lastSection}>
        <div className={style.quantity}>
          <button
            className={style.plus}
            type="button"
            name="button"
            onClick={handleIncrement}
          >
            +
          </button>
          <input type="text" name="name" value={quantity} readOnly />
          <button
            className={style.minus}
            type="button"
            name="button"
            onClick={handleDecrement}
          >
            -
          </button>
        </div>
        <div className={style.orderNow}>
          <div className={style.shop}>اطلب الان</div>
        </div>
      </div>
    </div>
  );
}

export default Content;
