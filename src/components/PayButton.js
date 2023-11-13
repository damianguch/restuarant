import axios from 'axios';
import Button from './elements/Button';

export const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    axios
      .post('http://localhost:8080/api/create-checkout-session', {
        cartItems
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
