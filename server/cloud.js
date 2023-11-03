require('dotenv').config()
import {v2 as cloudinary} from 'cloudinary';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


cloudinary.uploader.upload("https://unsplash.com/photos/cooked-rice-with-egg-ykThMylLsbY",
  { public_id: "ykThMylLsbY" }, 
  function(error, result) {
    console.log(result)
});