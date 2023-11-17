import axios from 'axios';
import Button from './elements/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/userInfo/userSlice';

export const PayButton = ({ cartItems }) => {
  const user = useSelector(selectUser);
  const handleCheckout = () => {
    axios
      .post('http://localhost:8080/api/create-checkout-session', {
        cartItems,
        user: user._id
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Button variant="dark" onClick={() => handleCheckout()}>
      <span>Check Out</span>
    </Button>
  );
};
