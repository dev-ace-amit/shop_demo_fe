import Head from 'next/head'
import { useEffect, useState} from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

// Importing actions from  cart.slice.js
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cart.slice';

const CartPage = () => {
  const cart =  useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    <>
    <Head>
        <title>Cart Page</title>
    </Head>
    <div className="text-center p-8">
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className="header flex justify-between mt-8">
            <div>Title</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map((item) => (
            <div key={`cart_${item._id}`} className="body flex justify-between items-center align-center mb-4">
              <p>{item.title}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className="buttons">
                <button onClick={() => dispatch(incrementQuantity(item._id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item._id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item._id))}>
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </>
      )}
    </div>
    </>
  );
};

export default CartPage;
