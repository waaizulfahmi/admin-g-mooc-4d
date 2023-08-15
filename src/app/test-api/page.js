'use client';

// core
import { useEffect, useState } from 'react';

// api
import { registerApi, loginApi, logoutApi, resendVerifyApi, forgotPasswordApi, resetPasswordApi } from '@/axios/auth';

const TestApi = () => {
    const [token, setToken] = useState('');

    // // REGISTER TEST
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const fetchApi = async () => {
    //             try {
    //                 const response = await registerApi({
    //                     name: 'arief',
    //                     email: 'xyz1001yt@gmail.com',
    //                     password: 'arief1001',
    //                     konfirmasi_password: 'arief1001',
    //                     host: window?.location?.origin,
    //                 });
    //                 console.log(response);
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         };
    //         fetchApi();
    //     }
    // }, []);

    // //LOGIN TEST
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         try {
    //             const response = await loginApi({ email: 'xyz1001yt@gmail.com', password: 'arief1001' });
    //             setToken(response.data.token);
    //             console.log(response);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchApi();
    // }, []);

    //LOGOUT TEST
    // useEffect(() => {
    //     if (token) {
    //         // console.log(token);
    //         const fetchApi = async () => {
    //             try {
    //                 const response = await logoutApi({ token });
    //                 console.log(response);
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         };
    //         fetchApi();
    //     }
    // }, [token]);

    // VERIFY TEST (ALREADY IN /verify-email pages)

    // RESEND VERIFY TEST
    // useEffect(() => {
    //     if (token && typeof window !== 'undefined') {
    //         const fetchApi = async () => {
    //             try {
    //                 const response = await resendVerifyApi({ token, host: window?.location?.origin });
    //                 const responseMsg = response?.metadata?.message;
    //                 console.log(responseMsg);
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         };
    //         fetchApi();
    //     }
    // }, [token]);

    // FORGOT PASSWORD TEST
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchApi = async () => {
                try {
                    const response = await forgotPasswordApi({
                        email: 'ariefrachmanhakim1001@gmail.com',
                        host: window?.location?.origin,
                    });
                    const responseMsg = response?.metadata?.message;
                    console.log(response);
                    console.log(responseMsg);
                } catch (error) {
                    console.log(error.message);
                }
            };
            fetchApi();
        }
    }, []);

    return <div>TestApi</div>;
};

export default TestApi;
