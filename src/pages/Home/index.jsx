import { Banner } from '../../components/Banner';
import { About } from '../../components/About';
import { ProductsPreview } from '../../components/ProductsPreview';
import { Search } from '../../components/SearchBar';

const Home = () => {
  return (
    <>
      <Banner />
      <ProductsPreview />
      <Search />
      <About />
    </>
  );
};

export default Home;
