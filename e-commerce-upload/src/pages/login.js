  import axios from 'axios';
  import { useRouter } from 'next/router';
  import NextLink from 'next/link';
  import React, { useContext, useEffect } from 'react';
  import { Store } from '../utils/Store';
  import Cookies from 'js-cookie';
  import { Controller, useForm } from 'react-hook-form';
  import { useSnackbar } from 'notistack';
  import { getError } from '../utils/error';
  
  export default function Login() {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    // useEffect(() => {
    //   if (userInfo) {
    //     router.push('/');
    //   }
    // }, []);
  
    const submitHandler = async ({ email, password }) => {
      closeSnackbar();
      try {
        const { data } = await axios.post('/api/users/login', {
          email,
          password,
        });
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', data);
        // router.push(redirect || '/');
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    };
    return (
     
        <form onSubmit={handleSubmit(submitHandler)} >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <input
                    id="email"
                    type='email'
                    {...field}
                  ></input>
                )}
              ></Controller>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <input
                    id="password"
                    type='password'
                    {...field}
                  ></input>
                )}
              ></Controller>
              <button  type="submit" >
                Login
              </button>
        </form>

    );
  }