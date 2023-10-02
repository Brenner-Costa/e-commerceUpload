import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    TableContainer,
    Typography,
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    ListItemText,
    CardActionArea,
} from "@material-ui/core";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: " " };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload, error: "" };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function orderHistory() {
    const { state } = useContext(Store);
    const router = useRouter();
    const { userInfo } = state;

    const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    });

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        const fetchOrders = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchOrders();
    }, []);

    //Fazer o Frontend
}

export default dynamic(() => Promise.resolve(orderHistory), { ssr: false });
