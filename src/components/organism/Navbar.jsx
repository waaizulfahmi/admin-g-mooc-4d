import PropTypes from 'prop-types';

// components
import HeroIcon from '../atoms/HeroIcon';
import Links from '../atoms/Links';
import NavbarButton from '../molecules/NavbarButton';

// data
import { navUrlPath } from '@/data/path-url';

const Navbar = ({ className }) => {
    return (
        <div className={`${className}  w-screen `}>
            <nav className='mx-auto flex max-w-screen-lg items-center justify-between  py-3'>
                <HeroIcon alt='icons' imgUrl='/images/voice-icon.svg' height={100} width={100} />
                <Links links={navUrlPath} />
                <NavbarButton />
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
