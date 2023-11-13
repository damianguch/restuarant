import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart/cartSlice';

export const SearchResults = ({ menu }) => {
  const dispatch = useDispatch();

  const AddToCart = (product) => {
    console.log(product);
    dispatch(addToCart(product));
  };

  return (
    <div
      className="search-result px-3 py-1.5 hover:bg-gray-300 cursor-pointer text-lg font-medium"
      onClick={() => AddToCart(menu)}
    >
      {menu.name}
    </div>
  );
};
