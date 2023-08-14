'use client';

// import React from 'react'
import PropTypes from 'prop-types';

const Input = ({ id, ...rest }) => {
    return <input {...rest} id={id} />;
};

Input.propTypes = {
    id: PropTypes.string,
};

export default Input;
