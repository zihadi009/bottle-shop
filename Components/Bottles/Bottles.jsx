import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLS,
  getStoredCart,
  removeFromLS,
} from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  useEffect(() => {
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      const savedBottle = [];
      for (const id of storedCart) {
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedBottle.push(bottle);
        }
      }
      setCart(savedBottle);
    }
  }, [bottles]);

  const [cart, setCart] = useState([]);
  const handleAddToCart = (bottle) => {
    const exist = cart.find((bot) => bot.id === bottle.id);
    if (exist) {
      return;
    } else {
      setCart([...cart, bottle]);
      addToLS(bottle.id);
    }
  };

  const handleRemoveFromCart = (id) => {
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    removeFromLS(id);
  };

  return (
    <div>
      Total Bottles Available: {bottles.length}
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
