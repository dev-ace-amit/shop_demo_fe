import { useEffect } from 'react';
import { Provider } from 'react-redux'; 
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import store from '../redux/store';
import { dataFromApiToCart } from '../redux/cart.slice';
import RouteGuard from '../components/RouteGuard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // redirect to home if already logged in
    if (typeof window !== "undefined") {
      store.dispatch(dataFromApiToCart(JSON.parse(window.localStorage.getItem('cartData'))))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col justify-between">
        <RouteGuard>
          <Navbar />
            <ToastContainer />
            <Component {...pageProps} />
          <Footer />
        </RouteGuard>
      </div>
    </Provider>
  );
}
