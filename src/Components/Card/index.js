import React from "react";
import styles from "./item.module.scss";
import ContentLoader from "react-content-loader";
import Context from "../../Context";

const Item = ({
  favorited = false,
  loading = false,
  id,
  name,
  price,
  desc,
  img,
  getCartItems,
  addedFavorited,
}) => {
  const {ItemAddedOnCart } = React.useContext(Context);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, name, price, img };

  const addToCart = () => {
    getCartItems(obj);
    ItemAddedOnCart(id);
  };

  const onClickFavorite = () => {
    addedFavorited(obj);
    setIsFavorite(!isFavorite)
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={298}
          height={497}
          viewBox="0 0 220 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="169" height="100" />
          <rect x="0" y="159" rx="0" ry="0" width="160" height="15" />
          <rect x="0" y="185" rx="0" ry="0" width="90" height="15" />
          <rect x="0" y="250" rx="0" ry="0" width="90" height="30" />
          <rect x="140" y="250" rx="0" ry="0" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
            {addedFavorited &&
            <div onClick={onClickFavorite}>
            <img
                className={styles.btnCheckLike}
                src={isFavorite
                  ? "/img/like.svg" : "/img/unlike.svg"}
                alt="like"
              />
            </div>
              }
          <img
            draggable="false"
            className={styles.itemPhoto}
            // height={165}
            src={img}
            alt="item"
          />
          <h3>{name}</h3>
          <p>{desc}</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <p>Цена:</p>
              <b>{price} сом</b>
            </div>
            <div className={styles.disabled}>
              {getCartItems && (
                <img
                  onClick={addToCart}
                  src={
                    ItemAddedOnCart(id) ? "/img/itsLike.svg" : "/img/plusik.svg"
                  }
                  alt="plusik"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
