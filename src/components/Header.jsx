import foody from '../assets/images/logo.webp';
import cartIcon from '../assets/icons/cart.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Button from './elements/Button';
import { useDispatch } from 'react-redux';
import { resetUser } from '../stores/userInfo/userSlice';

export const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggeIn] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth token');
    sessionStorage.removeItem('User Id');
    dispatch(resetUser());
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  useEffect(() => {
    const checkAuthToken = () => {
      const token = sessionStorage.getItem('Auth token');
      if (token) {
        setIsLoggeIn(true);
      } else {
        setIsLoggeIn(false);
        toast.success('Successfully Logged Out!🎉', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        });
      }
    };

    // Register event listener to handle the 'storage' event.
    // Event listener performs actions(checkAuthToken) in response to changes in
    //the storage.

    window.addEventListener('storage', checkAuthToken);
    return () => {
      window.removeEventListener('storage', checkAuthToken);
    };
  }, []);

  return (
    <nav id="header" className="bg-black text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-0.75">
        <div className="logo-wrapper pl-4 flex items-center">
          <Link
            to="/"
            className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <img src={foody} alt="logo" className="w-32 h-32 object-cover" />
          </Link>
        </div>
        <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
          <Link to="/" className="text-xl">
            Home
          </Link>

          <Link to="/services" className="text-xl">
            Services
          </Link>
          <Link to="about" className="text-xl">
            About
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/cart" className="mr-4 relative">
            <img src={cartIcon} alt="cart" />
            {cartCount > 0 ? (
              <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">
                {cartCount}
              </div>
            ) : null}
          </Link>
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Log Out</Button>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </nav>
  );
};
