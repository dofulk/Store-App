import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { removeItem } from '../../redux/cartSlice';
import { styled } from '@mui/material/styles';
import CartItem from '../CartItem/CartItem';
import currency from 'currency.js';
import { useNavigate } from 'react-router-dom';


const Cart = () => {


    const cart = useSelector(state => state.cart.items)
    const navigate = useNavigate()

    const [numberOfItems, setNumberOfItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(currency(0))

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
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            margin: '50px'
        }}>
            {cart.length > 0 ?
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        

                    }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '70%',
                    }}>
                        {cart.map(item => (
                            <CartItem cartItem={item} key={item.product.code} navigate={navigate}></CartItem>
                        ))}
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30%'
                    }}>

                        <div>
                            Order Summary: {numberOfItems} Items
                        </div>
                        <div>
                            Order Total: {totalPrice.format()}
                        </div>
                        <Button onClick={() => navigate('/Checkout')} variant="contained">Checkout</Button>

                    </div>
                </div>
                :

                <div
                    style={{
                        width: '100%'
                    }}
                >
                    <Typography
                        style={{
                            margin: '15px'
                        }}
                        variant="h4">
                        Oops! It looks like you don't have anything in your cart!
                    </Typography>
                    <Button
                        onClick={() => navigate('/Store')}
                        variant="contained"
                        style={{
                            margin: '15px'
                        }}>Continue Shopping</Button>
                </div>}

        </div>
    )
}


export default Cart