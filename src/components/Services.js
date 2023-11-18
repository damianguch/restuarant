const Services = () => {
  return (
    <div className="grid place-items-center mt-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Our Special Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Express Delivery</h2>
          <p className="text-gray-600">
            Get your favorite food delivered at your doorstep in no time with
            our express delivery service.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Variety of Cuisines</h2>
          <p className="text-gray-600">
            Explore a wide range of cuisines from around the world and satisfy
            your taste buds with our diverse menu.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">24/7 Support</h2>
          <p className="text-gray-600">
            Our customer support team is available 24/7 to assist you with any
            queries or issues you may have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
