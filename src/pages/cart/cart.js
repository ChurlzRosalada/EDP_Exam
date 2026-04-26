import React, {useContext} from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { Link } from "react-router-dom";

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const hasItems = PRODUCTS.some((product) => cartItems[product.id] > 0);

    const handleCheckout = () => {
        if (hasItems) {
            alert("Thank you for your purchase! Order placed successfully.");
        }
    };

    return (
        <div className="cart" style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
            <div className="cartContainer" style={{ flex: 1 }}>
                <h1>Your Cart Items</h1>
                <div className="cartItems">
                    {PRODUCTS.map((product) => {
                        if(cartItems[product.id] !== 0) {
                            return <CartItem key={product.id} data={product} />
                        }
                        return null;
                    })}
                </div>
                {!hasItems && (
                    <div className="emptyCart">
                        <p>Your cart is empty</p>
                        <Link to="/">Continue Shopping</Link>
                    </div>
                )}
            </div>

            <div className="checkout" style={{ width: '320px', position: 'sticky', top: '20px' }}>
                <h2>Order Summary</h2>
                <div className="summaryItem">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summaryItem">
                    <span>Shipping:</span>
                    <span>${hasItems ? (10).toFixed(2) : (0).toFixed(2)}</span>
                </div>
                <div className="summaryTotal">
                    <span>Total:</span>
                    <span>${(totalAmount + (hasItems ? 10 : 0)).toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} disabled={!hasItems} className="checkoutBtn">
                    {hasItems ? "Proceed to Checkout" : "Add Items to Checkout"}
                </button>
            </div>
        </div>
    );
}         