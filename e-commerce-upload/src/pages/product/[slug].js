import NextLink from 'next/link';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import { useSnackbar } from 'notistack';

export default function product(props) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const { product } = props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [ loading, setLoading ] = useState(false);

    if(!product) {
        <div>Esse produto não existe!</div>
    } 
    const addToCartHandler = async() => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantily = existItem ? existItem.quantily + 1 : 1;
        const { data } = await axios.get(`api/products/${product._id}`);
        if(data.countInStock < quantily) {
            window.alert('Esse produto não está no estoque!')
            return
        } 
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantily }})
        router.push('/cart');
    }
}


export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: db.convertDocToObj(product),
        },
    };
}