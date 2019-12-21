import React from 'react';


const Button = ({className, onClick, text}) => {

    return(
        <input className={className} onClick={onClick} type="button" value={text}/>
    )
};

export default Button