import React from 'react';

const Button = (props) => {
    const value = props.value;
    const onClick = props.onClick;
    return(
        <button onClick={onClick}>{value}</button>
    )
}

export default Button;