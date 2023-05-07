import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
    toast('Item added to cart.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  }

  return (
    <div>
      <Image src={product.image} height={300} width={220} alt="shop" />
      <h4 className="text-base">{product.title}</h4>
      <p className="mt-2">$ {product.price}</p>
      <button 
        onClick={() => addItemToCart(product)}
        className="w-full mt-2 py-3 bg-white uppercase pointer border border-black hover:bg-black hover:text-white">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
