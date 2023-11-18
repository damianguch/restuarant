import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD94ZxobFB6Wo5246rSH5R2t20s05FuN_4',
  authDomain: 'food-delivery-app-91f55.firebaseapp.com',
  projectId: 'food-delivery-app-91f55',
  storageBucket: 'food-delivery-app-91f55.appspot.com',
  messagingSenderId: '183135862944',
  appId: '1:183135862944:web:f785d5713fdb5477be49c5'
};

export const app = initializeApp(firebaseConfig);
