'use client';

// core
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// third parties

// component
import BorderedButton from '@/components/atoms/BorderedButton';
import Input from '@/components/atoms/Input';
import PasswordInput from '@/components/atoms/PasswordInput';
import FillButton from '@/components/atoms/FillButton';

const Register = () => {
    const router = useRouter();

    return (
        <section className='grid h-screen grid-cols-12'>
            <div className={`relative  col-span-4 h-full`}>
                <Image priority src={'/images/left-auth.png'} alt='' fill />
                <Image
                    alt=''
                    src={'/images/icon-white.svg'}
                    width={166}
                    height={60}
                    className='absolute left-[24px] top-[24px]'
                />
                <div
                    className={`absolute bottom-[30%] left-1/2 flex translate-x-[-50%] flex-col items-center justify-center gap-5 text-white`}>
                    <h1 className='text-[40px] font-bold leading-[20px]'>Hallo !</h1>
                    <p className='text-center '>Masukkan Detail Pribadi Anda dan Mulailah Pembelajaran Anda</p>
                    <BorderedButton theme='light' onClick={() => router.replace('/login', { scroll: false })}>
                        Masuk
                    </BorderedButton>
                </div>
            </div>
            <div className='bg-neutral-7 col-span-8 flex items-center justify-center'>
                <div className='flex w-[646px] flex-col gap-[42px]'>
                    <div className='text-center'>
                        <h1 className='text-title-2 font-bold'>Buat Akun Baru</h1>
                        <p className='text-body-2'>Buktikan Sekarang Semua Bisa Belajar</p>
                    </div>
                    <form className='flex flex-col items-center gap-[24px]'>
                        <Input placeholder='Nama' type='text' />
                        <Input placeholder='Email' type='text' />
                        <PasswordInput placeholder='Kata Sandi' />
                        <PasswordInput placeholder='Ulang Kata Sandi' />
                        <FillButton type='submit' className='w-max px-[52px] py-[16px]'>
                            Daftar
                        </FillButton>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
