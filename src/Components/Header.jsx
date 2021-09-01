import React from 'react';
import {Link} from 'react-router-dom'
import Context from '../Context';
import { useCart } from '../Hooks/useCart';
const Header = () => {

  const {overStyle} = React.useContext(Context)
  const { totalPrice } = useCart()

    return (
        <header className="d-flex justify-between align-center p-40 clear">
          <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="https://assets.faceit-cdn.net/avatars/f2788fb8-8dc3-4413-a579-9e5ab140bdea_1590162723679.jpg" alt="logo" />
          <div>
            <h3 className="text-uppercase">Последний самурай</h3>
            <p>ресторан японской кухни</p>
          </div>
        </div>
        </Link>
        <ul className="d-flex align-center">
          <li style={{cursor:"pointer"}} className="d-flex mr-10" onClick={() => overStyle("hidden",true)}>
            <img width={18} height={18} src="/img/Group.svg" alt="cart" />
            <span>{totalPrice} руб.</span>
          </li>
          <li>
            <Link to="/favorite">
            <img style={{cursor: "pointer"}} src="/img/Vector.svg" alt="like" />
            </Link>
          </li>
          <li className="mr-30">
            <Link to="/orders">
            <img width={18} height={18} src="/img/Union.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;