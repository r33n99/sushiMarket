import React from 'react';
import Context from '../Context';
import Info from './info'
const Overlay = ({cartItems,removeItemOnCart}) => {

  const {setCartIsOpen,setCartItems} = React.useContext(Context)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([])
  }    

    return (
        <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30 d-flex justify-between ">Корзина
          <img onClick={()=> setCartIsOpen(false)} className="cu-p" src="/img/btnRemove.svg" alt="remove" />
          </h2>

          {cartItems.length > 0 ? 
          <>
          <div className="items">
            
        
          {
            cartItems.map((el,index) => (
              <div key={index} className="cart-item d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${el.img})`}}
                className="cart-item-img"
              >
              </div>
              <div className="mr-20 flex">
              <p className="mb-5">{el.name}</p>
              <b>{el.price} руб</b>
              </div>
              <img onClick={() => removeItemOnCart(el.id)} className="remove-btn" src="/img/btnRemove.svg" alt="remove" />
            </div>
            ))
          }
            </div>

            <div className="cart-total-block">
            <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб. </b>
              </li>
              <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб. </b>
              </li>
          </ul>
          <button onClick={onClickOrder} className="green-btn">Оформить заказ
            <img className="forward" src="/img/arrow.svg" alt="arrow" />
          </button>
            </div>
              </>
              :
              <Info title={isOrderComplete ? "Заказ принят!" : "Корзина пустая"} desc={isOrderComplete ? "Ваш заказ #18 скоро будет передан курьерской доставке" : "Добавьте хотя-бы что-нибудь хосподи"} img={isOrderComplete ? "/img/order.png" : "/img/box.png"} />
              }
        </div>
      </div>
    )
}

export default Overlay;