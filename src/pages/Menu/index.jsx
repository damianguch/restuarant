import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectAllProducts
} from '../../stores/menu/productSlice';
import { useEffect } from 'react';

const Menu = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="bg-white">
      {products.status !== 'fulfilled' ? (
        <div>loading...</div>
      ) : (
        <div className="menu-wrapper">
          {products.products && (
            <Tabs
              list={products.products.map((product) => product.name.name)}
              activeTab={activeTab}
              onTabSwitch={onTabSwitch}
            />
          )}
          <div className="flex flex-row mx-3">
            {products.products &&
              products.products[activeTabIndex].products.map(
                (product, index) => {
                  return (
                    <ProductDetailCard
                      key={index}
                      product={product}
                      onAddProduct={onAddProduct}
                    />
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
