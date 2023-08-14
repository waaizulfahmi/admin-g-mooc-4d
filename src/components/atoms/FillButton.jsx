//core
import PropTypes from 'prop-types';

const FillButton = ({ className = 'py-[20px] px-[130px]', children, ...rest }) => {
    return (
        <button
            {...rest}
            className={`${className} bg-primary-1 text-neutral-5 border-primary-1 cursor-pointer appearance-none rounded-rad-5 font-monsterrat font-bold outline-none`}>
            {children}
        </button>
    );
};

FillButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default FillButton;
