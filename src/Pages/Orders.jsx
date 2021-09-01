import React from "react";
import axios from "axios";
import Item from "../Components/Card";

const Orders = () => {

  const [isLoading,setIsLoading] = React.useState(true)
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
            "https://60d469ee61160900173cb231.mockapi.io/orders"
          );
          setOrders(data.reduce((prev,obj) => [...prev, ...obj.items], []))
          setIsLoading(false)
      } catch (error) {
          alert("Ошибка при рендере заказов")
      }
})();
  },[]);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="collection d-flex flex-wrap">
          {(isLoading ? [...Array(8)] : orders).map((el, index) => {
          return (
            <Item
               cartItems
               key={index}
               {...el}
               loading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
