'use client';

import Image from 'next/image';

// components
import Navbar from '@/components/organism/Navbar';
import FillButton from '@/components/atoms/FillButton';

const Rapor = () => {
    return (
        <>
            <Navbar />
            <main style={{ height: 'calc(100vh - 90px)' }} className='mt-[90px] w-screen bg-primary-1 '>
                <section className='mx-auto grid max-w-screen-xl grid-cols-12 gap-[78px] '>
                    <div className='col-span-8 pt-[10px]'>
                        <div className='mb-[16px] flex items-center justify-between rounded-rad-7 bg-[#F5F5F5] py-[20px] '>
                            <div className='ml-[39px]'>
                                <h1 className='text-[32px] font-bold leading-[60px]'>Hallo, Jhon!</h1>
                                <p className='text-[16px]  leading-[20px]'>Senang bertemu denganmu lagi</p>
                            </div>
                            <Image alt='' src={'/images/avatar.svg'} width={117} height={159} className='mr-[95px]' />
                        </div>

                        <div className='flex items-center justify-between rounded-rad-7 bg-[#F5F5F5] px-[24px] py-[14px]'>
                            <div className='flex items-center gap-[34px]'>
                                <Image alt='' src={'/images/javascript.svg'} width={54} height={54} />
                                <p className='text-[20px] leading-[20px]'>JavaScript - Video 2</p>
                            </div>

                            <div className='flex items-center gap-[24px]'>
                                <div className='rounded-rad-3 bg-secondary-1 px-[36px] py-[16px]'>
                                    <span className='font-bold text-white'>40%</span>
                                </div>
                                <FillButton className='px-[58px] py-[16px]'>Lanjut</FillButton>
                            </div>
                        </div>

                        <h1 className='my-[42px] text-3xl font-bold text-white'>Semua Pembelajaran</h1>

                        <div>
                            <div className='flex items-center justify-between rounded-rad-7 bg-[#F5F5F5] px-[24px] py-[14px]'>
                                <div className='flex items-center gap-[34px]'>
                                    <Image alt='' src={'/images/javascript.svg'} width={54} height={54} />
                                    <p className='text-[20px] leading-[20px]'>JavaScript</p>
                                </div>

                                <div className='flex items-center gap-[24px]'>
                                    <FillButton className='px-[58px] py-[16px]'>Lihat Kelas</FillButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 pt-[10px]'>
                        <div className='mb-[50px] flex justify-between gap-[30px]'>
                            <div className='rounded-rad-7 bg-secondary-1 px-[18px] py-[20px]'>
                                <h1 className='text-[48px] font-bold  leading-[60px] text-white'>80%</h1>
                                <span className='font-bold text-white'>Rata Rata Progress</span>
                            </div>
                            <div className='rounded-rad-7 bg-secondary-1 px-[18px] py-[20px]'>
                                <h1 className='text-[48px] font-bold  leading-[60px] text-white'>2</h1>
                                <span className='font-bold text-white '>Kelas di selesaikan</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-[77px] rounded-rad-7 bg-[#F5F5F5] px-[100px] py-[50px]'>
                            <div className='flex flex-col'>
                                <h1 className=' mb-[12px] text-[56px] font-bold leading-[60px] text-secondary-1'>50</h1>
                                <p className='font-bold'> poin</p>
                            </div>
                            <Image alt='' src={'/images/trophy.svg'} width={130} height={130} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Rapor;
