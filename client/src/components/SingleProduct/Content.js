import React, { useEffect, useState } from "react";
import style from "./Content.module.css";

function Content({ products, isLoading }) {
  const [selectedColor, setSelectedColor] = useState(
    products?.fetchedProduct?.details[0]?.color || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    products?.fetchedProduct?.details[0]?.sizes[0]?.size || ""
  );
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color) => {
    setSelectedColor(color);

    const firstInstance = products?.fetchedProduct?.details.find(
      (detail) => detail.color === color
    );
    if (firstInstance) {
      setSelectedSize(firstInstance.sizes[0]?.size || "");

      if (quantity > firstInstance.sizes[0]?.quantity || 1) {
        setQuantity(1);
      }
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);

    const selectedColorDetails = products.fetchedProduct.details.find(
      (detail) => detail.color === selectedColor
    );
    const selectedSizeDetails = selectedColorDetails.sizes.find(
      (s) => s.size === size
    );
    if (quantity > selectedSizeDetails.quantity) {
      setQuantity(1);
    }
  };

  useEffect(() => {
    if (
      products?.fetchedProduct?.details.length > 0 &&
      products?.fetchedProduct?.details[0].color
    ) {
      const firstColor = products.fetchedProduct.details[0].color;
      const firstSize = products.fetchedProduct.details[0].sizes[0]?.size || "";

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
    }
  }, [products]);

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

  const isOrderButtonDisabled = () => {
    const selectedColorDetails = products.fetchedProduct.details.find(
      (detail) => detail.color === selectedColor
    );

    if (selectedColorDetails && selectedColorDetails.sizes) {
      const selectedSizeDetails = selectedColorDetails.sizes.find(
        (s) => s.size === selectedSize
      );

      return selectedSizeDetails ? selectedSizeDetails.quantity === 0 : true;
    }

    return true;
  };

  const getAvailableQuantity = (color, size) => {
    const selectedColorDetails = products.fetchedProduct.details.find(
      (detail) => detail.color === color
    );
    const selectedSizeDetails = selectedColorDetails.sizes.find(
      (s) => s.size === size
    );

    return selectedSizeDetails ? selectedSizeDetails.quantity : 0;
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={style.content}>
      <div className={style.title}>{products.fetchedProduct.name}</div>
      <div className={style.price}>${products.fetchedProduct.price}</div>
      <div className={style.desc}>{products.fetchedProduct.description}</div>
      <div className={style.color}>
        <h2>اختار اللون</h2>
        <div className={style.colorPalette}>
          {products.fetchedProduct.details.map((detail, index) => (
            <div
              key={index}
              onClick={() => handleColorChange(detail.color)}
              style={{
                backgroundColor: detail.color,
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                border:
                  detail.color === selectedColor ? "6px solid white" : null,
                transition: "border 0.2s",
              }}
            >
              <span
                style={{
                  width: "50px",
                  height: "50px",
                  border:
                    detail.color == selectedColor ? "2px solid #333" : null,
                  position: "absolute",
                  borderRadius: "50%",
                  transition: "border 0.1s",
                }}
              ></span>
            </div>
          ))}
        </div>
      </div>
      <div className={style.size}>
        <h2>اختار القياس</h2>
        <div className={style.sizes}>
          {products.fetchedProduct.details
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
        {products.fetchedProduct.details
          .filter((detail) => detail.color === selectedColor)
          .map((detail) => {
            const selectedSizeDetails = detail.sizes.find(
              (s) => s.size === selectedSize
            );
            return (
              <div className={style.quantity} key={selectedSizeDetails._id}>
                {selectedSizeDetails.quantity === 0 ? (
                  <span className={style.soldOut}>Sold Out</span>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            );
          })}
        <div className={style.orderNow}>
          <div className={style.shop} disabled={isOrderButtonDisabled()}>
            اضف الى السلة
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
