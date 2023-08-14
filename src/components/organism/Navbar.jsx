'use client';

// core
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import HeroIcon from '../atoms/HeroIcon';
import Links from '../atoms/Links';
import NavbarButton from '../molecules/NavbarButton';

// data
import { navUrlPath } from '@/data/path-url';

const Navbar = ({ className }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleColorNav = () => {
        if (window.scrollY >= 200 || document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        handleColorNav();
        window.addEventListener('scroll', handleColorNav);
        return () => {
            window.removeEventListener('scroll', handleColorNav);
        };
    });

    return (
        <nav
            className={`${isScrolled ? 'shadow-low' : 'shadow-none'} ${className} fixed top-0 z-20 w-screen bg-white py-[36px] `}>
            <div className='mx-auto flex max-w-screen-xl items-center justify-between  py-3'>
                <HeroIcon alt='icons' imgUrl='/images/voice-icon.svg' height={100} width={100} />
                <Links links={navUrlPath} />
                <NavbarButton />
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
