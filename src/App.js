import React from "react";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import axios from "axios";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";
import Favorites from "./Pages/Favorites";
import Context from "./Context";
import Orders from "./Pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItem, setfavoriteItem] = React.useState([]);
  const [searchValue, setsearchValue] = React.useState("");
  const [cartIsOpen, setCartIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      async function fetchDate() {
      try {
        const [dataItems, dataCartItems, dataFavorites] = await Promise.all([
          axios.get("https://60d469ee61160900173cb231.mockapi.io/items"),
          axios.get("https://60d469ee61160900173cb231.mockapi.io/cart"),
          axios.get("https://60d469ee61160900173cb231.mockapi.io/favorites"),
        ]);

        setIsLoading(false);
        setCartItems(dataCartItems.data);
        setfavoriteItem(dataFavorites.data);
        setItems(dataItems.data);
    } catch (error) {
      alert("Не удалось загрузить данные");
    }
  }
  fetchDate();
  }, []);

  async function addOnCart(obj) {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
          await axios.delete(`https://60d469ee61160900173cb231.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://60d469ee61160900173cb231.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("не удалось добавить товар");
    }
  }

  function removeItemOnCart(id) {
    try {
      axios.delete(`https://60d469ee61160900173cb231.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("не удалось загрузить элемент из корзины")
    }
  };

  async function addFavorite(obj) {
    try {
      if (favoriteItem.find((favObj) => Number(favObj.id) === Number(obj.id))) {
       axios.delete(
          `https://60d469ee61160900173cb231.mockapi.io/favorites/${obj.id}`
        );
        setfavoriteItem((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://60d469ee61160900173cb231.mockapi.io/favorites",
          obj
        );
        setfavoriteItem((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };


  function OnChangeSearchItem(e) {
    setsearchValue(e.target.value);
  }

  function ItemAddedOnCart(id) {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }



  function overStyle(style, status) {
    window.scrollTo(0,0)
    const body = document.querySelector("body");
    body.style.overflow = `${style}`;
    setCartIsOpen(status);
  }

  return (
    <Context.Provider
      value={{
        overStyle,
        items,
        cartItems,
        favoriteItem,
        addOnCart,
        addFavorite,
        ItemAddedOnCart,
        setCartIsOpen,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Overlay cartItems={cartItems} onClose={() => setCartIsOpen(false)}  opened={cartIsOpen} removeItemOnCart={removeItemOnCart} />
        <Header />

        <Route path="/favorite">
          <Favorites />
        </Route>
        <Route exact path="/">
          <Home
            isLoading={isLoading}
            addFavorite={addFavorite}
            addOnCart={addOnCart}
            items={items}
            searchValue={searchValue}
            favoriteItem={favoriteItem}
            OnChangeSearchItem={OnChangeSearchItem}
            setsearchValue={setsearchValue}
          />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </Context.Provider>
  );
}

export default App;
