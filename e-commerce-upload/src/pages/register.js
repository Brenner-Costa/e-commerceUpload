import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";

export default function Register() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            router.push("/");
        }
    }, []);

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("As senhas não coincidem", { variant: "error" });
            return;
        }
        try {
            const { data } = await axios.post('api/users/register', {
                name,
                email,
                password,
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            router.push(redirect || '/');
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };
};
