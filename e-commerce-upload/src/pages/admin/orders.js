import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';


function reducer (state, action) {
    switch(action.type) {
        case 'FETCH_REQUEST': 
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS': 
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL': 
            return { ...state, loading: false, error: action.payload }
        default: 
            state;
    }
}

function AdminOrders () {
    const { state, } = useContext(Store);
    const router = useRouter();
    const { userInfo } = state;

    const [{loading, orders, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '', 
        orders: [],
    } )

    useEffect(() => {
        !userInfo 
        ? router.push('/login')
        : (fetchData = async() => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const { data } = await axios.get(`api/admin/orders`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err)});
            }
        }, fetchData()) 
    }, [])
}

export default dynamic(() => Promise.resolve(AdminOrders), { ssr: false });