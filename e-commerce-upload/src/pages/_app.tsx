// import '../styles/global.css'


// import { theme } from "../styles/theme"
// import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
// import { SnackbarProvider } from 'notistack';
// import { SessionProvider } from "next-auth/react";



// import { Navbar } from "../components/Navbar"
import { StoreProvider } from '../utils/Store';
// import { Footer } from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    //@ts-ignore
    //baixar a biblioteca do snackbar o retirar esse provider por enquanto
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        {/* descomentar o SessionProvider */}
        {/* <SessionProvider> */}
        {/* <ChakraProvider resetCSS theme={theme}> */}
        {/* <Navbar /> */}
        <Component {...pageProps} />
        {/* <Footer /> */}
        {/* </ChakraProvider> */}
        {/* </SessionProvider> */}
      </StoreProvider>
    </SnackbarProvider>


  )
}