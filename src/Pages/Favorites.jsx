import React from "react";
import Item from '../Components/Card'
import Context from "../Context";

const Favorites = () => {

  const {favoriteItem,addFavorite} = React.useContext(Context)

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Избранные суши</h1>
          <div className="search-block d-flex">
          </div>
        </div>
          <div className="collection d-flex flex-wrap">
          {favoriteItem.map((el, index) => {
              return (
                <Item
                  favorited
                  key={index}
                  addedFavorited={addFavorite}
                  {...el}
                />
              );
            })}

          </div>
      </div>
    )
}

export default Favorites;
