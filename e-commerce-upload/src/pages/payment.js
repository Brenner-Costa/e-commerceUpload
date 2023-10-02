import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export default function Payment() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [state, dispatch] = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, []);

  const submitHandler = (e) => {
      closeSnackbar();
      e.preventDefault();
      if(!paymentMethod) {
        enqueueSnackbar("A forma de pagamento é obrigatória", { variant: 'error' });
      } else {
        dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
        Cookies.set('paymentMethod', paymentMethod);
        router.push('/placeorder');
      }
  }
}
