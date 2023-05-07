import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userService } from '../services/userService';
import { dataFromApiToCart } from '../redux/cart.slice';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        return userService.login(email, password)
            .then((res) => {
                console.log('res', res);
                if(res.data.cartData.length > 0) {
                    //have existing cart data for this user, put it in state
                    dispatch(dataFromApiToCart(res.data.cartData))
                    localStorage.setItem('cartData', JSON.stringify(res.data.cartData));
                }
                else {
                    localStorage.setItem('cartData', JSON.stringify([]));
                }
                if(res.data.data == null) {
                    setError('apiError', { message: "Invalid email/password." });
                }
                else {
                    router.push('/');
                }
            })
            .catch(error => {
                setError('apiError', { message: error });
            });
    }

    return (
        <>
        <Head>
            <title>Shop Login</title>
        </Head>
        <div className="">
            <h2 className="text-center mb-4 text-2xl">Login To Shopping Cart App</h2>
            <div className="flex p-4 border border-1 border-black justify-center max-w-[400px] m-auto">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <input name="email" type="text" {...register('email')} placeholder="email" className="border border-1 p-2 mb-2 w-full"/>
                    <input name="password" type="password" {...register('password')} placeholder="password" className="border border-1 p-2 mb-2 w-full"/>
                        
                    <button disabled={formState.isSubmitting} className="px-4 py-2 my-2 bg-[#f9826c] text-white">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                    {errors.apiError &&
                        <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                    }
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
