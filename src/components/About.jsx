import aboutImage from '../assets/images/about.jpg';

export const About = () => {
  return (
    <div className="bg-white">
      <div className="p-24 grid grid-cols-2">
        <div className="">
          <h2 className="text-2xl font-semibold">About Us</h2>
          <p className="text-lg text-gray-600">
            Welcome to Kitchen Cravings, where convenience meets culinary
            delight! We are your go-to food ordering app, dedicated to bringing
            you a seamless and flavorful dining experience. Whether you're
            craving your favorite local cuisine or exploring new tastes, our
            user-friendly platform connects you with a diverse array of
            restaurants at your fingertips. With just a few taps, satisfy your
            cravings, enjoy hassle-free ordering, and savor the convenience of
            having delicious meals delivered right to your doorstep. Discover
            the joy of effortless dining with us.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={aboutImage}
            alt="restaurant"
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
