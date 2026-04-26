import React,{useContext} from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const {id, name, price, productImg} = props.data;
    const {addToCart} = useContext(ShopContext);

    const handleAddToCart = () => {
        addToCart(id);
        alert(`${name} has been added to your cart!`);
    };

    return ( <div className="product">
        <img src={productImg} alt={name} />
        <div className="description">
            <p>
                <b>{name}</b>
            </p>
            <p>${price}</p>
        </div>
        <button className="addToCartBtn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
        
    );
}