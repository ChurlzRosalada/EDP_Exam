import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import "./navbar.css";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/"><h1>SM ECOMMERCE</h1></Link>
            </div>
            <div className="links">
                <Link to="/">STORE</Link> 
                <Link to="/cart">
                    <ShoppingCartSimple size={32} />
                </Link> 
            </div>
        </nav>
    );
};