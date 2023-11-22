import {
  CardElement,
  useElements,
  useStripe,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, cartProducts } from '../stores/cart/cartSlice';
import { getAddress, clearAddress } from '../stores/userInfo/addressSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './elements/Button';
import { getUser } from '../stores/userInfo/userSlice';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(cartProducts);
  const address = useSelector(getAddress);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if stripe is initialized
    if (!stripe || !elements || !cart?.length || !address) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://food-ordering-b921316c67e7.herokuapp.com/api/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            paymentMethod: 'card',
            orderItems: cart,
            userId: user._id,
            shippingAddress: address
          })
        }
      );

      const { error: backEndError, clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });

      if (backEndError || stripeError) {
        setError(backEndError || stripeError);
        console.log(error);
      } else if (paymentIntent.status === 'succeeded') {
        dispatch(clearAddress());
        dispatch(clearCart());
        navigate('/payment-success');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <form
      className="md:-2/3 md:mx-auto px-2 pt-1"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-element" className="pt-4 text-2xl md:text-center">
        Please enter your card details
      </label>
      <div className="my-4">
        <CardElement id="card-element" />
      </div>
      <div className="flex justify-center p-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
};
