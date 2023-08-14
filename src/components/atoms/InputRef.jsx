import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputRef = forwardRef(function InputRef({ id, ...rest }, ref) {
    return <input {...rest} ref={ref} id={id} />;
});

InputRef.propTypes = {
    id: PropTypes.string,
};

export default InputRef;
