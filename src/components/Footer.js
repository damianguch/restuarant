import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer class="bg-gray-800">
      <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Restuarant
          </h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <Link to="/about">About Us</Link>
            </li>
            <li class="mb-4">
              <Link to={'/menu'}>Menus</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Legal
          </h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <Link to={'/policy'}>Privacy Policy</Link>
            </li>
            <li class="mb-4">
              <Link to={'/license'}>Licensing</Link>
            </li>
            <li class="mb-4">
              <Link to={'/terms-conditions'}>Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Contact Us
          </h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <p>Address:</p>
              <p>42 Albater Street, Off Taroline Market, Wuse 2 Abuja</p>
            </li>
            <li class="mb-4">
              <p>Phone:</p>
              <p>00219927267</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="py-6 px-4 bg-gray-700 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-300 sm:text-center mx-auto">
          © 2023 Food Ordering App. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
