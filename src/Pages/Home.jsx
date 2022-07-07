import React from "react";
import Item from '../Components/Card'

const Home = ({isLoading,searchValue,OnChangeSearchItem,setsearchValue,items,favoriteItem,addOnCart,addFavorite}) => {


  function renderItems() {
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      isLoading ? [...Array(8)] : filteredItems)
      .map((el, index) => {
        return (
          <Item
            cartItems
            favoriteItem={favoriteItem}
            key={index}
            {...el}
            getCartItems={(obj) => addOnCart(obj)}
            addedFavorited={addFavorite}
            loading={isLoading}
          />
        );
      })
    
  }

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 style={{textAlign:"center"}}>{searchValue ? `Поиск по "${searchValue}"` : "Меню"}</h1>
          <div className="search-block d-flex">
            <img src="/img/lupa.svg" alt="search" />
            <input
              value={searchValue}
              onChange={OnChangeSearchItem}
              type="text"
              placeholder="Поиск..."
            />
            <img
              onClick={() => setsearchValue("")}
              style={{ cursor: "pointer" }}
              width={20}
              src="/img/btnRemove.svg"
              alt="removeSearch"
            />
          </div>
        </div>
  <div className="collection d-flex flex-wrap">  
          {renderItems()}
          </div>
      </div>
    )
}

export default Home;