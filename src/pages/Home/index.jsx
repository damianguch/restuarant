import { Banner } from '../../components/Banner';
import { About } from '../../components/About';
import { ProductsPreview } from '../../components/ProductsPreview';
import { Search } from '../../components/Search';
import Services from '../../components/Services';

const Home = () => {
  return (
    <>
      <Banner />
      <ProductsPreview />
      <Search />
      <Services />
      <About />
    </>
  );
};

export default Home;
