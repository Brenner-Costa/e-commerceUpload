import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';

function Cart() {
    const router = useRouter();
    const [ state, dispatch ] = useContext(Store);
    const {
        cart: { cartItems }
    } = state;
    const updateHandler = async(item, quantity) => {
        const { data } = await axios.get(`api/products/${item._id}`);
        if(data.countInStock < quantity) {
            window.alert("Desculpa. O produto não esta no estoque!"); 
            return
        } 
        dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
    }

    const removeItemHandler = async(item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item  });
    }

    const checkoutHandler = () => {
        router.push("/shipping");
    }

    //FAZER O FRONT END

}


export default dynamic(() => Promise.resolve(Cart), { ssr: false });