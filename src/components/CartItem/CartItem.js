import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Button, FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import { removeItem, changeQuantity } from '../../redux/cartSlice';
import { styled } from '@mui/material/styles';
import currency from 'currency.js';

const Img = ({ src }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div>

            <img style={{
                maxWidth: '100%',
                height: 'auto',
                cursor: 'pointer',
                opacity: 1,
                display: loaded ? "block" : "none"
            }}
                src={src}
                alt={"img"}
                onLoad={() => setLoaded(true)}
            />
            <Skeleton sx={{ display: loaded ? "none" : "block" }} height={200} variant="rectangular"></Skeleton>
        </div>
    )
};

const CartItem = ({ cartItem, navigate }) => {
    const dispatch = useDispatch()
    let product = cartItem.product


    let quantitySelections = (maxAmount) => {
        let items = []
        for (let i = 1; i <= maxAmount; i++) {
            items.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
        }
        return items
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px'
        }}>
            <div style={{
                width: '15%'
            }}
            onClick={() => navigate(`/Product/${product.code}`)}
            >
                <Img src={product.srcs[0]} ></Img>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%'
            }}>
                <Link
                    onClick={() => navigate(`/Product/${cartItem.product.code}`)}
                    style={{ cursor: 'pointer' }}>
                    {cartItem.product.title}
                </Link>
                <div>
                    {currency(cartItem.product.price).format()}
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%'
            }}
            >
                <FormControl>
                    <InputLabel id="quantity-label">Qty</InputLabel>
                    <Select
                        labelId="quantity=label"
                        label="Qty"
                        value={cartItem.quantity}
                        onChange={event => dispatch(changeQuantity({ product: cartItem.product, quantity: event.target.value }))}
                    >

                        {quantitySelections(cartItem.product.numberInStock)}

                    </Select>
                </FormControl>
                <div>
                    Subtotal: {currency(cartItem.product.price).multiply(cartItem.quantity).format()}
                </div>
                <Button variant="contained" onClick={() => dispatch(removeItem(cartItem.product.code))}>Remove</Button>
            </div>

        </div>
    )
}

export default CartItem