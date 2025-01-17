import React, { useState } from 'react';
import { urlFor, client } from "../../lib/client";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

function ProductDetails({product, products}) {
  const {image, name, price, details} = product || {}
  const [index, setIndex] = useState(0);
  const {qty, incQty, decQty, onAdd, setShowCart} = useStateContext();


  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={urlFor(image && image[index])} alt=""/>
          </div>
          <div className="small-images-container">
            {image?.map((item, idx) => (
              <img key={idx} className={index === idx ? 'small-image selected-image' : 'small-image'} src={urlFor(item)}
                   onMouseEnter={() => setIndex(idx)} alt=""/>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus/>
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus/>
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const productsQuery = `*[_type == "product"] {
    slug {
      current
    }
  }`
  const products = await client.fetch(productsQuery);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params: {slug}}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery);


  return {
    props: {
      product,
      products,
    }
  }
}

export default ProductDetails;