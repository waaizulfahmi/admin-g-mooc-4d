'use client';

// core
import { useEffect, useState } from 'react';
import Image from 'next/image';

// third party
import { useSession } from 'next-auth/react';

// components
import Navbar from '@/components/organism/Navbar';

// apis
import { getAllClassApi } from '@/axios/user';

// utils
import { getImageFile } from '@/utils/getServerStorage';

const Kelas = () => {
    const { data } = useSession();
    const token = data?.user?.token;

    const [kelas, setKelas] = useState([]);

    useEffect(() => {
        if (token) {
            const fetchApi = async () => {
                const response = await getAllClassApi({ token });
                setKelas(response.data);
            };

            fetchApi();
        }
    }, [token]);

    return (
        <>
            <Navbar />
            <div style={{ height: 'calc(100vh - 90px)' }} className='mx-auto mt-[90px] grid  max-w-screen-xl grid-cols-12'>
                <div className='  col-span-3 bg-red-500'></div>
                <div className='col-span-9 bg-blue-500'></div>
            </div>
        </>
    );
};

export default Kelas;
