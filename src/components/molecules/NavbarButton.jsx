'use client';

import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';

// third party
import { useSession, signOut } from 'next-auth/react';

// axios
import { logoutApi } from '@/axios/auth';

// component
import BorderedButton from '../atoms/BorderedButton';
import FillButton from '../atoms/FillButton';

const NavbarButton = ({ className = 'gap-[33px]', btnBorderedText = 'Masuk', btnFillText = 'Daftar' }) => {
    const path = usePathname();
    const { status, data } = useSession();
    const token = data?.user?.token;

    const handleSignOut = async () => {
        if (token) {
            const response = await logoutApi({ token });
            if (response?.metadata?.status === 'success') {
                signOut();
            }
        }
    };

    switch (status) {
        case 'loading':
            return (
                <div className={`${className} flex`}>
                    <FillButton onClick={() => signOut()} className='invisible px-[36px] py-[12px]'>
                        Keluar
                    </FillButton>
                    <BorderedButton className='w-[200px]  py-[12px]' theme={path === '/rapor' ? 'light' : 'dark'}>
                        Memuat Data...
                    </BorderedButton>
                </div>
            );
        case 'authenticated':
            return (
                <div className={`${className} flex`}>
                    {path === '/rapor' ? (
                        <>
                            <BorderedButton className='invisible px-[36px] py-[12px]' theme='dark'>
                                {btnBorderedText}
                            </BorderedButton>
                            <BorderedButton
                                onClick={handleSignOut}
                                className='w-[200px] py-[12px]'
                                theme={path === '/rapor' ? 'light' : 'dark'}>
                                Keluar
                            </BorderedButton>
                        </>
                    ) : (
                        <>
                            <BorderedButton className='invisible px-[36px] py-[12px]' theme='dark'>
                                {btnBorderedText}
                            </BorderedButton>
                            <FillButton onClick={handleSignOut} className='w-[200px] py-[12px]'>
                                Keluar
                            </FillButton>
                        </>
                    )}
                </div>
            );
        default:
            return (
                <div className={`${className} flex`}>
                    <BorderedButton className='px-[36px] py-[12px]' theme='dark'>
                        {btnBorderedText}
                    </BorderedButton>
                    <FillButton className='px-[36px] py-[12px]'>{btnFillText}</FillButton>
                </div>
            );
    }
};

NavbarButton.propTypes = {
    className: PropTypes.string,
    btnBorderedText: PropTypes.string,
    btnFillText: PropTypes.string,
};

export default NavbarButton;
