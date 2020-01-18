import React from 'react';
import * as PropTypes from 'prop-types';


const Button = ({className, onClick, text}) => {

    return(
        <input className={className} onClick={onClick} type="button" value={text}/>
    )
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Button