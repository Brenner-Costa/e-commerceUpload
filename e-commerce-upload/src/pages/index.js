import NextLink from 'next/link';
import Product from '../models/Product';
import { Grid, Link, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import axios from 'axios';
import db from '../utils/db';

export default function Home(props) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { featuredProducts } = props;
    const addToCartHandler = async(product) => {
        const existItem = state.cart.cartItens.find((x) => x._id === product._id);
        const quantily = existItem ? existItem.quantily + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.countInStock < quantily) {
            window.alert('Desculpa. O produto não consta no estoque!');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantily }});
        router.push('/cart');
    };


return (
    <Layout>
      <Carousel className={classes.mt1} animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}


export async function getServerSideProps() {
    await db.connect();
    const featuredProducts = await Product.find({isFeatured: true})
    .lean()
    .limit(3);
    await db.disconnect();
    return {
        props: {
            // featuredProducts: featuredProductsDocs.map(db.convertDocToObj), // Esta dando um erro
            featuredProducts,
        },
    };
}