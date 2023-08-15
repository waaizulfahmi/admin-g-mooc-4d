'use client';

//core
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

//  api
import { verifyApi } from '@/axios/auth';

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    // state
    const [loading, setLoading] = useState(true);
    const [verifyStatus, setVerifyStatus] = useState('loading'); // loading | success | failed
    const [verifyMsg, setVerifyMsg] = useState('');

    useEffect(() => {
        if (url) {
            const fetchApi = async () => {
                try {
                    const response = await verifyApi({ url });
                    setVerifyStatus('success');
                    setVerifyMsg(response?.metadata?.message);
                } catch (error) {
                    setVerifyStatus('failed');
                    setVerifyMsg(error?.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchApi();
        }
    }, [url]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    switch (verifyStatus) {
        case 'failed':
            return (
                <div>
                    <h1>Verifikasi Gagal!</h1>
                    <p>{verifyMsg}</p>
                </div>
            );
        default:
            return (
                <div>
                    <h1>Verifikasi Berhasil!</h1>
                    <p>{verifyMsg}</p>
                </div>
            );
    }
};

export default VerifyEmail;
