import NextLink from 'next/link';
import Product from '../models/Product';
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
};


export async function getServerSideProps() {
    await db.connect();
    const featuredProducts = await Product.find({isFeatured: true})
    .lean()
    .limit(3);
    await db.disconnect();
    return {
        props: {
            featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
        },
    };
}