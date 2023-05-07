import Head from 'next/head'
import ProductCard from '../components/ProductCard';
import { apiService } from '../services/apiService';
import { getProducts } from './api/products/index';

const ShopPage = ({ products }) => {
  return (
    <>
    <Head>
        <title>Products Page</title>
    </Head>
    <div className="mb-4 px-8">
      <h1 className="text-4xl uppercase m-4 mt-0">All Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-4 place-items-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ShopPage;

export async function getStaticProps() {
  const products = await apiService.getProducts();
  return { props: { products } };
}
