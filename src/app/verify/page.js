'use client';

import Image from 'next/image';

import FillButton from '@/components/atoms/FillButton';

const Verify = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center bg-primary-1'>
            <div className='flex h-[500px] w-[700px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-[#EDF3F3]'>
                <Image alt='' src={'/images/security-success.png'} width={266} height={133} />
                <p className='font-bold'>Yeay ! Email Kamu Sudah Terverifikasi</p>
                <FillButton>Ke Beranda</FillButton>
            </div>
        </div>
    );
};

export default Verify;
