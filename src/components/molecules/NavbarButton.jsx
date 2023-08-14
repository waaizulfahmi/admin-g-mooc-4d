import PropTypes from 'prop-types';

// component
import BorderedButton from '../atoms/BorderedButton';
import FillButton from '../atoms/FillButton';

const NavbarButton = ({ className = 'gap-[33px]', btnBorderedText = 'Masuk', btnFillText = 'Daftar' }) => {
    return (
        <div className={`${className} flex`}>
            <BorderedButton className='px-[36px] py-[14px]' theme='dark'>
                {btnBorderedText}
            </BorderedButton>
            <FillButton className='px-[36px] py-[14px]'>{btnFillText}</FillButton>
        </div>
    );
};

NavbarButton.propTypes = {
    className: PropTypes.string,
    btnBorderedText: PropTypes.string,
    btnFillText: PropTypes.string,
};

export default NavbarButton;
