import React from "react";
import Context from "../Context";

const Info = ({img,title,desc}) => {

    const {overStyle} = React.useContext(Context)

  return (
    <div className="d-flex justify-center text-center">
      <h3>{title}</h3>
      <img
        className="cart"
        width={360}
        height={300}
        src={img}
        alt="box"
      />
      <p>{desc}</p>
      <div className="cart-total-block">
        <button onClick={() => overStyle("auto",false)} className="green-btn justify-between p-30">
            <img className="back" src="/img/backArrow.svg" alt="" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
};
export default Info;
