import axios from "axios";
import React from "react";

import Context from "../../Context";
import Info from "../info";
import Preloader from "../../Preloader/Preloader";
import { useCart } from "../../Hooks/useCart";

import s from "./overlay.module.scss";

const Overlay = ({ removeItemOnCart, opened }) => {
  const { overStyle, setCartItems, cartItems } = React.useContext(Context);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [getOrderId, setGetOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://60d469ee61160900173cb231.mockapi.io/orders",
        { items: cartItems }
      );
      setGetOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://60d469ee61160900173cb231.mockapi.io/cart/` + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ :( ");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${s.overlay} ${opened ? s.overIsVisible : ""}`}>
      <div className={s.drawer}>
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img
            onClick={() => overStyle("auto", false)}
            className="cu-p"
            src="/img/btnRemove.svg"
            alt="remove"
          />
        </h2>
        {isLoading ? (
          <Preloader className="preloader" />
        ) : (
          <CartStatus
            isLoading={isLoading}
            getOrderId={getOrderId}
            isOrderComplete={isOrderComplete}
            onClickOrder={onClickOrder}
            removeItemOnCart={removeItemOnCart}
            cartItems={cartItems}
          />
        )}
      </div>
    </div>
  );
};

export default Overlay;

const CartStatus = ({
  isLoading,
  getOrderId,
  isOrderComplete,
  cartItems,
  removeItemOnCart,
  onClickOrder,
}) => {
  const { totalPrice } = useCart();
  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <div className={s.items}>
            {cartItems.map((el, index) => (
              <div key={index} className="cart-item d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${el.img})` }}
                  className="cart-item-img"
                ></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{el.name}</p>
                  <b>{el.price} руб</b>
                </div>
                <img
                  onClick={() => removeItemOnCart(el.id)}
                  className="remove-btn"
                  src="/img/btnRemove.svg"
                  alt="remove"
                />
              </div>
            ))}
          </div>

          <div className="cart-total-block">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} сом. </b>
              </li>
              <li>
                <span>Доставка:</span>
                <div></div>
                <b>от 120 сом. </b>
              </li>
            </ul>
            <button
              disabled={isLoading}
              onClick={onClickOrder}
              className="green-btn"
            >
              Оформить заказ
              <img className="forward" src="/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </>
      ) : (
        <Info
          title={isOrderComplete ? "Заказ принят!" : "Корзина пустая"}
          desc={
            isOrderComplete
              ? `Ваш заказ #${getOrderId} скоро будет передан курьерской доставке`
              : "Добавьте хотя-бы что-нибудь хосподи"
          }
          img={isOrderComplete ? "/img/order.png" : "/img/box.png"}
        />
      )}
    </>
  );
};
