'use client';

import Image from 'next/image';

import FillButton from '@/components/atoms/FillButton';
import ArrowButton from '@/components/atoms/ArrowButton';

const VerifyFailed = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center bg-primary-1'>
            <Image src={'/images/icon-white.svg'} alt='' width={166} height={40} className='absolute left-[20px] top-[20px]' />
            <ArrowButton className='absolute left-[100px] top-[100px] p-[10px]' />
            <div className='mt-[50px] flex h-[400px] w-[540px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-[#EDF3F3]'>
                <Image alt='' src={'/images/security-failed.png'} width={266} height={133} />
                <p className='font-bold text-alert-1'>Oops ! Email Kamu Belum Terverifikasi</p>
                <FillButton className='px-[60px] py-[18px]'>Ke Halaman Regist</FillButton>
            </div>
        </div>
    );
};

export default VerifyFailed;
