import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Stack, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import { styled } from '@mui/material/styles';
import { borderColor } from '@mui/system';
import ImageMagnifier from '../ImageMagnifier/ImageMagnifier';
import currency from 'currency.js';


const Img = styled('img')({
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    cursor: 'pointer',
    opacity: 1,
});


const Product = () => {

    const [addedToCart, setAddedToCart] = useState(false)

    const navigate = useNavigate()

    let params = useParams()
    let product = useSelector(state => state.products.items.filter(item => item.code === params.productId)[0])
    const numberInCart = useSelector(state => {
        let itemInCart = state.cart.items.filter(item => item.product.code === params.productId)
        if (itemInCart.length) {
            return itemInCart[0].quantity
        } else {
            return 0
        }
    })
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const [displayedProduct, setDisplayedProduct] = useState(0)

    let quantitySelections = (maxAmount) => {
        let items = []
        for (let i = 1; i <= maxAmount; i++) {
            items.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
        }
        return items
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '70%', minHeight: '95vh' }}>
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '9%', margin: '10px' }}>
                        <Stack>
                            {product.srcs.map((item, index) => (
                                <div style={{
                                    borderStyle: 'solid',
                                    borderColor: displayedProduct === index ? 'white' : 'transparent',
                                    borderWidth: '1px',
                                    padding: '3px',
                                    margin: '5px'
                                }}
                                    key={item}
                                >
                                    <Img src={item} alt={product.title} onMouseEnter={() => setDisplayedProduct(index)} />

                                </div>
                            ))}
                        </Stack>
                    </div>
                    <div style={{ width: '45%', margin: '10px' }}>

                        <ImageMagnifier src={product.srcs[displayedProduct]} alt={product.title} loading='lazy' />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '35%',
                        margin: '10px',
                    }}>
                        <Typography variant="h3" style={{ margin: '10px' }}>
                            {product.title}
                        </Typography >
                        <Typography variant="h4" style={{ margin: '10px' }} >
                            {currency(product.price).format()}
                        </Typography>
                        {product.numberInStock > numberInCart ?
                            <div style={{ margin: '10px' }}>
                                <FormControl sx={{ flexShrink: 1, margin: '10px' }}>
                                    <InputLabel id="quantity-label" >Qty</InputLabel>
                                    <Select
                                        labelId="quantity-label"
                                        label="Qty"
                                        value={quantity}
                                        onChange={event => setQuantity(event.target.value)}
                                    >

                                        {quantitySelections(product.numberInStock - numberInCart)}

                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={() => {
                                    dispatch(addItem({ product: product, quantity: quantity }))
                                    setQuantity(1)
                                    setAddedToCart(true)
                                }}
                                style={{ margin: '10px' }}
                                >ADD TO CART</Button>
                            </div>
                            :
                            <div>No More In Stock</div>
                        }
                        {addedToCart && <Button variant="contained" onClick={() => navigate('/Cart')}>CONTINUE TO CHECKOUT</Button>}

                    </div>
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}


export default Product