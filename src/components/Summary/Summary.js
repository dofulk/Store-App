import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import currency from 'currency.js';
import { useNavigate } from 'react-router-dom';


const Summary = () => {
    const navigate= useNavigate()
    const cart = useSelector(state => state.cart.items)

    const Img = styled('img')({
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        cursor: 'pointer',
        opacity: 1,
    });

    const [totalPrice, setTotalPrice] = useState(currency(0))
    const [numberOfItems, setNumberOfItems] = useState(0)

    useEffect(() => {
        let numberOfItems = 0
        let price = currency(0)
        for (let item in cart) {

            numberOfItems += cart[item].quantity
            price = currency(price).add(currency(cart[item].product.price).multiply(cart[item].quantity))
        }
        setNumberOfItems(numberOfItems)
        setTotalPrice(price)
    }, [cart]
    )




    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px'
            }}>
                {cart.map(item => (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        margin: '10px',
                    }}
                        key={item.product.title}
                    >
                        <div style={{
                            width: '20%'
                        }}
                        onClick={() => navigate(`/Product/${item.product.code}`)}
                        >
                            <Img src={item.product.srcs[0]}></Img>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '80%'
                        }}>
                            <Link variant="body1" 
                            onClick={() => navigate(`/Product/${item.product.code}`)} 
                            style={{cursor: 'pointer'}}>
                                {item.product.title}
                            </Link>

                            <Typography variant="body1">
                                Price: ${item.product.price}
                            </Typography>
                            <Typography variant="body1">
                                Quantity: {item.quantity}
                            </Typography>
                            <Typography variant="body1">

                                Subtotal: {currency(item.product.price).multiply(item.quantity).format()}
                            </Typography>
                        </div>

                    </div>
                ))}
            </div>
            <Typography variant="h5">
                {numberOfItems} Items
            </Typography>
            <Typography variant="h5">
                Order Total: {totalPrice.format()}
            </Typography>

        </div>
    )
}

export default Summary