import { useEffect, useState} from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { apiService } from '../services/apiService';
import { userService } from '../services/userService';
import { dataFromApiToCart, emptyCartOnLogout } from '../redux/cart.slice';

const Navbar = () => {
  const dispatch = useDispatch();

  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  const logoutUser = () => {
    dispatch(emptyCartOnLogout());
    userService.logout();
  }

  return (
    <nav className="flex justify-between items-center p-8 ">
      <h6 className="text-xl uppercase">Shop</h6>
      <ul className="flex">
        <li className="mx-3 list-none uppercase">
          <Link className="text-black hover:text-[#f9826c]" href="/">Home</Link>
        </li>
        <li className="mx-3 list-none uppercase">
          <Link className="text-black hover:text-[#f9826c]" href="/shop">Shop</Link>
        </li>
        <li className="mx-3 list-none uppercase">
          <Link className="text-black hover:text-[#f9826c]" href="/cart">Cart ({getItemsCount()})</Link>
        </li>
        {userService.userValue && (
          <li className="mx-3 list-none">
            <Link className="text-black hover:text-[#f9826c]" href="#" onClick={() => {logoutUser()}}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
