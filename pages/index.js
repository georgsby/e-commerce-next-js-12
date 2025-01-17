import React from 'react';

import { HeroBanner, Footer, Product, FooterBanner } from '../components'
import { client } from '../lib/client'

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]}/>
      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map(product => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData?.[0]}/>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props: {
      products,
      bannerData
    }
  }
}

export default Home;