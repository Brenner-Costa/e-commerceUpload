import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext } from 'react';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

function Profile() {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {
        handlerSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if(!userInfo) {
            return router.push('/login');
        }
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
    }, []);

    const submitHandler = async ({ name,email, password, confirmPassword }) => {
        if(password !== confirmPassword) {
            enqueueSnackbar('As senhas não coincidem', { variant: 'error' });
            return
        }
        try {
            const { data } = await axios.put('api/users/profile', 
            { name, email, password }, { headers: { authorization: `Bearer ${userInfo.token}` } });
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            enqueueSnackbar('Perfil atualizado com sucesso!', { variant: 'success' });
        } catch {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });