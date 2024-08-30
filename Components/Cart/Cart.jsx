import './Cart.css'
const Cart = ({cart, handleRemoveFromCart}) => {
    return (
        <div>
            <h2>Cart: {cart.length}</h2>
            <div className="cart-container">
                {
                    cart.map(bottle => <img onClick={()=>handleRemoveFromCart(bottle.id)} key={bottle.id} src={bottle.img}></img>)
                }
            </div>
        </div>
    );
};

export default Cart;