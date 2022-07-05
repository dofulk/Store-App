import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const CartButton = () => {

    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/Cart')
    }
    return (
    <Button color="inherit" onClick={() => handleClick()}>
        Cart
    </Button>
    )
}


export default CartButton