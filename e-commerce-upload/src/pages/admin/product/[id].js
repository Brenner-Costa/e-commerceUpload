import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import {
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    ListItemText,
    TextField,
    CircularProgress,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { getError } from "../../../utils/error";
import { Store } from "../../../utils/Store";
import Layout from "../../../components/Layout";
import useStyles from "../../../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, error: "" };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true, errorUpdate: "" };
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false, errorUpdate: "" };
        case "UPDATE_FAIL":
            return { ...state, loadingUpdate: false, errorUpdate: action.payload };
        case "UPLOAD_REQUEST":
            return { ...state, loadingUpload: true, errorUpload: "" };
        case "UPLOAD_SUCCESS":
            return { ...state, loadingUpload: false, errorUpload: "" };
        case "UPLOAD_FAIL":
            return { ...state, loadingUpload: false, errorUpload: action.payload };

        default:
            return state;
    }
}

function ProductEdit({ params }) {
    const productId = params.id;
    const { state } = useContext(Store);
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
        useReducer(reducer, { loading: true, error: "" });
    const {
        handlerSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { userInfo } = state;

    useEffect(() => {
        !userInfo
            ? router.push("/login")
            : ((fetchData = async () => {
                try {
                    dispatch({ type: "FETCH_REQUEST" });
                    const { data } = axios.get(`api/admin/products/${productId}`, {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    });
                    dispatch({ type: "FETCH_SUCCESS" });
                    setValue("name", data.name);
                    setValue("slug", data.slug);
                    setValue("category", data.category);
                    setValue("image", data.image);
                    setValue(data.isFeatured);
                    setValue("featuredImage", data.featuredImage);
                    setValue("price", data.price);
                    setValue("brand", data.brand);
                    setValue("countInStock", data.countInStock);
                    setValue("description", data.description);
                } catch (err) {
                    dispatch({ type: "FETCH_FAIL", payload: getError(err) });
                }
            }),
                fetchData());
    }, []);

    const uploadHandler = async (e, imageField = "image") => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        try {
            dispatch({ type: "UPLOAD_REQUEST" });
            const { data } = axios.get(`api/admin/upload`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${userInfo.token}`,
                },
            });
            dispatch({ type: "UPLOAD_SUCCESS" });
            setValue(imageField, data.secure_url);
            enqueueSnackbar("Upload bem sucedido!", { variant: "success" });
        } catch (err) {
            dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

    const submitHandler = async ({
        name,
        slug,
        category,
        image,
        featuredImage,
        price,
        brand,
        countInStock,
        description,
    }) => {
        closeSnackbar();
        try {
            dispatch({ type: "UPDATE_REQUEST" });
            const { data } = axios.put(`api/admin/products/${productId}`,
                {
                    name,
                    slug,
                    category,
                    image,
                    featuredImage,
                    price,
                    brand,
                    countInStock,
                    description,
                },
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'UPDATE_SUCCESS' })
            enqueueSnackbar("Produto editado com sucesso!", { variant: "success" });
            router.push('admin/products');
        } catch (err) {
            dispatch({type: "UPDATE_FAIL"});
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    const [isFeatured, setIsFeatured] = useState(false);

    
}


export async function getServerSideProps({ params }) {
    return {
      props: { params },
    };
  }
  
  export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
