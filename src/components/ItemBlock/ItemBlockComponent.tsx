import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductInterface } from "../../redux/basket/types";
import { basketProductsSelector } from "../../redux/basket/selectors";
import { addProduct } from "../../redux/basket/slice";
import { Link } from "react-router-dom";
import { ItemBlockInterface } from "../../redux/product/types";

const typeNames = ["тонкое", "традиционное"];

const ItemBlockComponent: React.FC<ItemBlockInterface> = (props) => {
  const dispatch = useDispatch();
  const basketProduct = useSelector(basketProductsSelector(props.id));
  const addedCount = basketProduct ? basketProduct.count : 0;
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const sizeNames = [26, 30, 40];

  const sizes = props.sizes.map((item, index) => (
    <li
      key={index}
      className={activeSize === index ? "active" : ""}
      onClick={() => setActiveSize(index)}
    >
      {item}
    </li>
  ));

  const onAddProduct = () => {
    const product: ProductInterface = {
      id: props.id,
      title: props.title,
      imageUrl: props.imageUrl,
      price: props.price,
      size: sizeNames[activeSize],
      type: typeNames[activeType],
      count: 0,
    };
    dispatch(addProduct(product));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/product/${props.id}`}>
          <img
            className="pizza-block__image"
            src={props.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{props.title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {props.types.map((item, index) => (
              <li
                key={index}
                className={activeType === index ? "active" : ""}
                onClick={() => setActiveType(index)}
              >
                {typeNames[item]}
              </li>
            ))}
          </ul>
          <ul>{sizes}</ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {props.price} ₸</div>
          <button
            className="button button--outline button--add"
            onClick={onAddProduct}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemBlockComponent;
